import { ConsultMessage, User, UserRole } from '@idea2app/data-server';
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { compose, JWTProps, jwtVerifier, RouteProps, router } from 'next-ssr-middleware';
import { FormEvent, ReactNode } from 'react';
import { formToJSON } from 'web-utility';

import { PageHead } from '../../../components/PageHead';
import { EvaluationDisplay } from '../../../components/Project/EvaluationDisplay';
import { ScrollList } from '../../../components/ScrollList';
import { SessionBox } from '../../../components/User/SessionBox';
import { ConsultMessageModel } from '../../../models/ProjectEvaluation';
import { i18n, I18nContext } from '../../../models/Translation';

type ProjectEvaluationPageProps = JWTProps<User> & RouteProps<{ id: string }>;

export const getServerSideProps = compose<{}, ProjectEvaluationPageProps>(jwtVerifier(), router);

@observer
export default class ProjectEvaluationPage extends ObservedComponent<
  ProjectEvaluationPageProps,
  typeof i18n
> {
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

  handleMessageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let { content } = formToJSON<{ content: string }>(event.currentTarget);

    content = content.trim();

    if (!content) return;

    await this.evaluationStore.updateOne({ content });

    event.currentTarget.reset();

    // Scroll to the last message
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  renderChatMessage = ({ id, content, evaluation, createdAt, createdBy }: ConsultMessage) => {
    const { t } = this.observedContext;
    const isBot = createdBy.roles.includes(3 as UserRole.Robot);
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
          <Avatar src={avatarSrc} alt={name} sx={{ width: 32, height: 32 }} />
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
            {evaluation && <EvaluationDisplay {...evaluation} />}

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

        <Container maxWidth="md" sx={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('project_evaluation')} {this.projectId}
          </Typography>

          {/* Chat Messages Area */}
          <Box sx={{ flex: 1, overflow: 'hidden', mb: 2 }}>
            <ScrollList
              translator={this.observedContext}
              store={this.evaluationStore}
              filter={{ project: this.projectId }}
              renderList={allItems => (
                <Box sx={{ height: '100%', overflowY: 'auto', p: 1 }}>
                  {allItems[0] ? (
                    allItems.map(this.renderChatMessage)
                  ) : (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Typography color="textSecondary">
                        {t('loading_project_evaluation')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            />
          </Box>

          {/* Message Input Form */}
          <Paper elevation={1} sx={{ p: 2, mt: 'auto' }}>
            <form onSubmit={this.handleMessageSubmit}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <TextField
                  name="content"
                  placeholder={t('type_your_message')}
                  multiline
                  maxRows={4}
                  fullWidth
                  variant="outlined"
                  size="small"
                  required
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ minWidth: 'auto', px: 2 }}
                  disabled={this.evaluationStore.uploading > 0}
                >
                  {t('send')}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </SessionBox>
    );
  }
}
