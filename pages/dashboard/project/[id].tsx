import { ConsultMessage, User, UserRole } from '@idea2app/data-server';
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { marked } from 'marked';
import { observer } from 'mobx-react';
import { ObservedComponent, reaction } from 'mobx-react-helper';
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
    super.componentDidMount();

    this.projectStore.getOne(this.projectId);
  }

  @reaction(({ messageStore }) => messageStore.allItems)
  async handleMessageChange() {
    await sleep();

    scrollTo('#last-message');
  }

  handleMessageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    let { content } = formToJSON<{ content: string }>(form);

    content = content.trim();

    if (!content) return;

    await this.messageStore.updateOne({ content });

    form.reset();
  };

  renderChatMessage = (
    { id, content, evaluation, prototypes, createdAt, createdBy }: ConsultMessage,
    index = 0,
    { length }: ConsultMessage[],
  ) => {
    const { t } = this.observedContext;
    const isBot = createdBy.roles.includes(3 as UserRole.Robot);
    const avatarSrc = isBot ? '/robot-avatar.png' : createdBy?.avatar || '/default-avatar.png';
    const name = isBot ? `${t('ai_assistant')} 🤖` : createdBy?.name || 'User';

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
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              borderRadius: '16px 16px 4px 16px',
            }}
          >
            <Typography variant="caption" display="block" sx={{ mb: 0.5, opacity: 0.8 }}>
              {name}
            </Typography>

            {content && (
              <Typography
                className="prose"
                variant="body2"
                sx={{ mb: 1 }}
                dangerouslySetInnerHTML={{ __html: marked(content) }}
              />
            )}
            {evaluation && (
              <EvaluationDisplay
                {...evaluation}
                projectId={this.projectId}
                messageId={id}
                prototypes={prototypes}
              />
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

        <Container
          maxWidth="md"
          sx={{ height: '85vh', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <h1 className="mt-20 text-3xl font-bold">{title}</h1>
          {/* Chat Messages Area */}
          <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
            <ScrollList
              translator={i18n}
              store={messageStore}
              filter={{ project: projectId }}
              renderList={allItems => (
                <Box sx={{ height: '100%', overflowY: 'auto', p: 1 }}>
                  {allItems.map(this.renderChatMessage)}
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
                className="text-nowrap"
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
