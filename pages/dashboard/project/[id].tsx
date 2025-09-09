import { ConsultMessage, RequirementEvaluation,User } from '@idea2app/data-server';
import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { compose, JWTProps, jwtVerifier, RouteProps, router } from 'next-ssr-middleware';
import { ReactNode } from 'react';

import { PageHead } from '../../../components/PageHead';
import { EvaluationDisplay } from '../../../components/Project/EvaluationDisplay';
import { ScrollList } from '../../../components/ScrollList';
import { SessionBox } from '../../../components/User/SessionBox';
import { ConsultMessageModel } from '../../../models/ProjectEvaluation';
import { i18n, I18nContext } from '../../../models/Translation';

interface ProjectEvaluationPageProps extends JWTProps<User>, RouteProps<{ id: string }> {}

export const getServerSideProps = compose<{}, ProjectEvaluationPageProps>(
  jwtVerifier(),
  router
);

@observer
export default class ProjectEvaluationPage extends ObservedComponent<ProjectEvaluationPageProps, typeof i18n> {
  static contextType = I18nContext;

  projectId = +this.props.route!.params!.id;
  
  evaluationStore = new ConsultMessageModel(this.projectId);

  get menu() {
    const { t } = this.observedContext;
    
    return [
      { href: '/dashboard', title: t('overview') },
      { href: `/dashboard/project/${this.projectId}`, title: t('project_evaluation') },
    ];
  }

  renderChatMessage = ({ id, content, evaluation, createdAt, createdBy }: ConsultMessage): ReactNode => {
    const { t } = this.observedContext;
    const isBot = !createdBy;
    const avatarSrc = isBot ? '/robot-avatar.png' : createdBy?.avatar || '/default-avatar.png';
    const name = isBot ? `🤖 ${t('ai_assistant')}` : createdBy?.name || 'User';

    return (
      <Box
        key={id}
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
            
            {content && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                {content}
              </Typography>
            )}
            
            {evaluation && (
              <EvaluationDisplay {...(evaluation as RequirementEvaluation)} />
            )}
            
            {createdAt && (
              <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.75rem' }}>
                {new Date(createdAt).toLocaleTimeString()}
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    );
  };

  render(): ReactNode {
    const { jwtPayload } = this.props;
    const { t } = this.observedContext;

    return (
      <SessionBox
        title={`${t('project_evaluation')} - ${this.projectId}`}
        path={`/dashboard/project/${this.projectId}`}
        menu={this.menu}
        jwtPayload={jwtPayload}
      >
        <PageHead title={`${t('project_evaluation')} - ${this.projectId}`} />

        <Container maxWidth="md" sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('project_evaluation')} {this.projectId}
          </Typography>

          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <ScrollList
              translator={this.observedContext}
              store={this.evaluationStore}
              filter={{ project: String(this.projectId) }}
              renderList={(allItems: ConsultMessage[]) => (
                <Box sx={{ height: '100%', overflowY: 'auto', p: 1 }}>
                  {allItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Typography color="textSecondary">
                        {t('loading_project_evaluation')}
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