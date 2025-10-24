import { ConsultMessage, User, UserRole } from '@idea2app/data-server';
import { Avatar, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { marked } from 'marked';
import { observer } from 'mobx-react';
import { ObservedComponent, reaction } from 'mobx-react-helper';
import { compose, JWTProps, jwtVerifier, RouteProps, router } from 'next-ssr-middleware';
import { FormEvent, KeyboardEventHandler } from 'react';
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

  handleQuickSubmit: KeyboardEventHandler = ({ ctrlKey, key, target }) => {
    if (ctrlKey && key === 'Enter')
      (target as HTMLTextAreaElement).form?.dispatchEvent(
        new SubmitEvent('submit', { cancelable: true, bubbles: true }),
      );
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
      <div
        key={id}
        id={index + 1 === length ? 'last-message' : undefined}
        className={`mb-2 flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}
      >
        <div
          className={`flex max-w-[95%] items-start gap-1 sm:max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
        >
          <Avatar src={avatarSrc} alt={name} className="h-7 w-7 sm:h-8 sm:w-8" />
          <Paper
            elevation={1}
            className="bg-primary-light text-primary-contrast rounded-[16px_16px_4px_16px] p-1.5 sm:p-2"
            sx={{
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
            }}
          >
            <Typography
              variant="caption"
              display="block"
              className="mb-0.5 text-[0.7rem] opacity-80 sm:text-[0.75rem]"
            >
              {name}
            </Typography>

            {content && (
              <Typography
                className="prose mb-1 text-[0.875rem] sm:text-base"
                variant="body2"
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
              <Typography variant="caption" className="text-[0.65rem] opacity-60 sm:text-[0.75rem]">
                {new Date(createdAt).toLocaleTimeString()}
              </Typography>
            )}
          </Paper>
        </div>
      </div>
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

        <Container maxWidth="md" className="px-4 py-6 pt-16">
          <h1 className="sticky top-[4rem] z-1 m-0 py-5 text-3xl font-bold backdrop-blur-md">
            {title}
          </h1>
          {/* Chat Messages Area */}
          <div className="mb-2 flex-1 overflow-auto">
            <ScrollList
              translator={i18n}
              store={messageStore}
              filter={{ project: projectId }}
              renderList={allItems => (
                <div className="h-full overflow-y-auto p-1 sm:p-2">
                  {allItems.map(this.renderChatMessage)}
                </div>
              )}
            />
          </div>

          {/* Message Input Form */}
          <Paper
            component="form"
            elevation={1}
            className="sticky bottom-0 mx-1 mt-auto mb-1 flex items-end gap-2 p-1.5 sm:mx-0 sm:mb-0 sm:p-2"
            onSubmit={this.handleMessageSubmit}
          >
            <TextField
              name="content"
              placeholder={t('type_your_message')}
              multiline
              maxRows={4}
              fullWidth
              variant="outlined"
              size="small"
              required
              onKeyUp={this.handleQuickSubmit}
            />
            <Button
              type="submit"
              variant="contained"
              className="min-w-full px-2 whitespace-nowrap sm:min-w-0"
              disabled={messageStore.uploading > 0}
            >
              {t('send')}
            </Button>
          </Paper>
        </Container>
      </SessionBox>
    );
  }
}
