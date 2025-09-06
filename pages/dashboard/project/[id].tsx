import { ProjectEvaluation, User } from '@idea2app/data-server';
import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { NextPage } from 'next';
import { compose, JWTProps, jwtVerifier, RouteProps, router } from 'next-ssr-middleware';
import { useContext } from 'react';

import { PageHead } from '../../../components/PageHead';
import { ScrollList } from '../../../components/ScrollList';
import { SessionBox } from '../../../components/User/SessionBox';
import { I18nContext } from '../../../models/Translation';
import { ProjectEvaluationModel } from '../../../models/ProjectEvaluation';

// Mock store for now - this would be replaced with actual implementation
const evaluationStore = new ProjectEvaluationModel();

interface ProjectEvaluationPageProps extends JWTProps<User>, RouteProps<{ id: string }> {}

export const getServerSideProps = compose<{}, ProjectEvaluationPageProps>(
  jwtVerifier(),
  router
);

const ProjectEvaluationPage: NextPage<ProjectEvaluationPageProps> = observer(
  ({ jwtPayload, route: { params } }) => {
    const { t } = useContext(I18nContext);
    const projectId = params!.id;

    const renderEvaluationHtml = (evaluation: any) => {
      if (!evaluation) return '';

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

      let html = '';
      
      if (techStack.length > 0) {
        html += `<div class="evaluation-item"><strong>技术栈:</strong> ${techStack.join(', ')}</div>`;
      }
      
      if (difficulty) {
        html += `<div class="evaluation-item"><strong>难度评估:</strong> ${difficulty}</div>`;
      }
      
      if (timeline) {
        html += `<div class="evaluation-item"><strong>开发周期:</strong> ${timeline}</div>`;
      }
      
      if (cost) {
        html += `<div class="evaluation-item"><strong>成本预估:</strong> ${cost}</div>`;
      }

      if (keyFeatures) {
        html += `<div class="evaluation-item"><strong>核心功能:</strong> ${keyFeatures}</div>`;
      }

      if (riskAssessment) {
        html += `<div class="evaluation-item"><strong>风险评估:</strong> ${riskAssessment}</div>`;
      }
      
      if (architecture) {
        html += `<div class="evaluation-item"><strong>架构设计:</strong><br/>${architecture}</div>`;
      }

      // Render any additional properties
      Object.entries(rest).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
          html += `<div class="evaluation-item"><strong>${key}:</strong> ${value}</div>`;
        }
      });

      return html;
    };

    const renderChatMessage = (item: ProjectEvaluation) => {
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
              
              {item.message && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {item.message}
                </Typography>
              )}
              
              {item.evaluation && (
                <Box
                  dangerouslySetInnerHTML={{
                    __html: renderEvaluationHtml(item.evaluation)
                  }}
                  sx={{
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
                  }}
                />
              )}
              
              {item.timestamp && (
                <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.75rem' }}>
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>
      );
    };

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
              translator={useContext(I18nContext)}
              store={evaluationStore}
              filter={{ projectId }}
              renderList={(allItems: ProjectEvaluation[]) => (
                <Box sx={{ height: '100%', overflowY: 'auto', p: 1 }}>
                  {allItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Typography color="textSecondary">
                        正在加载项目评估数据...
                      </Typography>
                    </Box>
                  ) : (
                    allItems.map(renderChatMessage)
                  )}
                </Box>
              )}
            />
          </Box>
        </Container>
      </SessionBox>
    );
  }
);

export default ProjectEvaluationPage;