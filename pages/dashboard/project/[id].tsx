import { ConsultMessage, User, UserRole } from '@idea2app/data-server';
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';
import { compose, JWTProps, jwtVerifier, RouteProps, router } from 'next-ssr-middleware';
import { FormEvent } from 'react';
import { formToJSON, scrollTo, sleep } from 'web-utility';

import { PageHead } from '../../../components/PageHead';
import { EvaluationDisplay } from '../../../components/Project/EvaluationDisplay';
import { ScrollList } from '../../../components/ScrollList';
import { SessionBox } from '../../../components/User/SessionBox';
import { ConsultMessageModel, ProjectModel } from '../../../models/ProjectEvaluation';
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

  projectStore = new ProjectModel();

  messageStore = new ConsultMessageModel(this.projectId);

  get menu() {
    const { t } = this.observedContext;

    return [
      { href: '/dashboard', title: t('overview') },
      { href: `/dashboard/project/${this.projectId}`, title: t('project_evaluation') },
    ];
  }

  componentDidMount() {
    this.projectStore.getOne(this.projectId);
  }

  handleMessageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let { content } = formToJSON<{ content: string }>(event.currentTarget);

    content = content.trim();

    if (!content) return;

    await this.messageStore.updateOne({ content });

    event.currentTarget.reset();

    await sleep(0.2);

    scrollTo('#last-message');
  };

  renderChatMessage = (
    { id, content, evaluation, createdAt, createdBy }: ConsultMessage,
    index = 0,
    { length }: ConsultMessage[],
  ) => {
    const { t } = this.observedContext;
    const isBot = createdBy.roles.includes(3 as UserRole.Robot);
    const avatarSrc = isBot ? '/robot-avatar.png' : createdBy?.avatar || '/default-avatar.png';
    const name = isBot ? `🤖 ${t('ai_assistant')}` : createdBy?.name || 'User';

    return (
      <Box
        key={id}
        id={index + 1 === length ? 'last-message' : undefined}
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

  render() {
    const { jwtPayload } = this.props,
      i18n = this.observedContext,
      { projectId, menu, projectStore, messageStore } = this;
    const { t } = i18n,
      currentProject = projectStore.currentOne;
    const title = `${currentProject.name} - ${t('project_evaluation')}`;

    return (
      <SessionBox {...{ jwtPayload, menu, title }} path={`/dashboard/project/${projectId}`}>
        <PageHead title={title} />

        <Container maxWidth="md" sx={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>

          {/* Chat Messages Area */}
          <Box sx={{ flex: 1, overflow: 'hidden', mb: 2 }}>
            <ScrollList
              translator={i18n}
              store={messageStore}
              filter={{ project: projectId }}
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
          <Paper
            component="form"
            elevation={1}
            sx={{ p: 2, mt: 'auto' }}
            onSubmit={this.handleMessageSubmit}
          >
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
                disabled={messageStore.uploading > 0}
              >
                {t('send')}
              </Button>
            </Box>
          </Paper>
        </Container>
      </SessionBox>
    );
  }
}
