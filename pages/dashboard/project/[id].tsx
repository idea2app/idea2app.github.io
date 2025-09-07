import { ConsultMessage, User } from '@idea2app/data-server';
import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import { compose, JWTProps, jwtVerifier, RouteProps, router } from 'next-ssr-middleware';
import { Component, ReactNode } from 'react';

import { PageHead } from '../../../components/PageHead';
import { ScrollList } from '../../../components/ScrollList';
import { SessionBox } from '../../../components/User/SessionBox';
import { ProjectEvaluationModel } from '../../../models/ProjectEvaluation';
import { I18nContext } from '../../../models/Translation';

// Mock store for now - this would be replaced with actual implementation
const evaluationStore = new ProjectEvaluationModel();

interface ProjectEvaluationPageProps extends JWTProps<User>, RouteProps<{ id: string }> {}

interface ProjectEvaluationPageState {}

export const getServerSideProps = compose<{}, ProjectEvaluationPageProps>(
  jwtVerifier(),
  router
);

interface EvaluationDisplayProps {
  evaluation: Record<string, any>;
}

// JSX component for rendering evaluation data
const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({ evaluation }) => {
  if (!evaluation) return null;

  const {
    techStack = [],
    difficulty = '',
    timeline = '',
    cost = '',
    architecture = '',
    keyFeatures = '',
    riskAssessment = '',
    ...rest
  } = evaluation;

  return (
    <Box sx={{
      '& .evaluation-item': {
        marginBottom: 1,
        fontSize: '0.875rem',
        padding: '4px 0',
        borderLeft: '3px solid',
        borderColor: 'primary.light',
        paddingLeft: 1,
      },
      '& strong': {
        fontWeight: 600,
        color: 'primary.dark',
      },
      '& ul': {
        margin: '8px 0',
        paddingLeft: '20px',
      },
      '& li': {
        marginBottom: '4px',
      },
    }}>
      {techStack.length > 0 && (
        <Box className="evaluation-item">
          <strong>技术栈:</strong> {techStack.join(', ')}
        </Box>
      )}
      
      {difficulty && (
        <Box className="evaluation-item">
          <strong>难度评估:</strong> {difficulty}
        </Box>
      )}
      
      {timeline && (
        <Box className="evaluation-item">
          <strong>开发周期:</strong> {timeline}
        </Box>
      )}
      
      {cost && (
        <Box className="evaluation-item">
          <strong>成本预估:</strong> {cost}
        </Box>
      )}

      {keyFeatures && (
        <Box className="evaluation-item">
          <strong>核心功能:</strong> {keyFeatures}
        </Box>
      )}

      {riskAssessment && (
        <Box className="evaluation-item">
          <strong>风险评估:</strong> {riskAssessment}
        </Box>
      )}
      
      {architecture && (
        <Box className="evaluation-item">
          <strong>架构设计:</strong>
          <Box component="div" sx={{ mt: 0.5 }}>
            {/* For now, render as text - in real implementation, this would be parsed */}
            {architecture.replace(/<[^>]*>/g, '').split('\n').filter((line: string) => line.trim()).map((line: string, index: number) => (
              <Box key={index} component="div" sx={{ ml: 1 }}>
                • {line.trim()}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Render any additional properties */}
      {Object.entries(rest).map(([key, value]) => (
        value && typeof value === 'string' && (
          <Box key={key} className="evaluation-item">
            <strong>{key}:</strong> {value}
          </Box>
        )
      ))}
    </Box>
  );
};

@observer
class ProjectEvaluationPage extends Component<ProjectEvaluationPageProps, ProjectEvaluationPageState> {
  static contextType = I18nContext;
  declare context: TranslationModel<any, any>;

  constructor(props: ProjectEvaluationPageProps) {
    super(props);
    this.state = {};
  }

  renderChatMessage = (item: ConsultMessage): ReactNode => {
    const isBot = !item.user;
    const avatarSrc = isBot ? '/robot-avatar.png' : item.user?.avatar || '/default-avatar.png';
    const name = isBot ? '🤖 AI助手' : item.user?.name || 'User';

    return (
      <Box
        key={item.id}
        sx={{
          display: 'flex',
          justifyContent: isBot ? 'flex-start' : 'flex-end',
          mb: 2,
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isBot ? 'row' : 'row-reverse',
            alignItems: 'flex-start',
            maxWidth: '80%',
            gap: 1,
          }}
        >
          <Avatar
            src={avatarSrc}
            alt={name}
            sx={{ width: 32, height: 32 }}
          />
          <Paper
            elevation={1}
            sx={{
              p: 2,
              backgroundColor: isBot ? 'grey.100' : 'primary.light',
              color: isBot ? 'text.primary' : 'primary.contrastText',
              borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
            }}
          >
            <Typography variant="caption" display="block" sx={{ mb: 0.5, opacity: 0.8 }}>
              {name}
            </Typography>
            
            {item.content && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                {item.content}
              </Typography>
            )}
            
            {item.evaluation && (
              <EvaluationDisplay evaluation={item.evaluation} />
            )}
            
            {item.createdAt && (
              <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.75rem' }}>
                {new Date(item.createdAt).toLocaleTimeString()}
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    );
  };

  render(): ReactNode {
    const { jwtPayload, route: { params } } = this.props;
    const { t } = this.context;
    const projectId = params!.id;

    const menu = [
      { href: '/dashboard', title: t('overview') },
      { href: `/dashboard/project/${projectId}`, title: t('project_evaluation') },
    ];

    return (
      <SessionBox
        title={`${t('project_evaluation')} - ${projectId}`}
        path={`/dashboard/project/${projectId}`}
        menu={menu}
        jwtPayload={jwtPayload}
      >
        <PageHead title={`${t('project_evaluation')} - ${projectId}`} />

        <Container maxWidth="md" sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            项目评估: {projectId}
          </Typography>

          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <ScrollList
              translator={this.context}
              store={evaluationStore}
              filter={{ project: projectId }}
              renderList={(allItems: ConsultMessage[]) => (
                <Box sx={{ height: '100%', overflowY: 'auto', p: 1 }}>
                  {allItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Typography color="textSecondary">
                        正在加载项目评估数据...
                      </Typography>
                    </Box>
                  ) : (
                    allItems.map(this.renderChatMessage)
                  )}
                </Box>
              )}
            />
          </Box>
        </Container>
      </SessionBox>
    );
  }
}

export default ProjectEvaluationPage;