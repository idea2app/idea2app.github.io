import { ConsultMessage, UserRole } from '@idea2app/data-server';
import { Avatar, LinearProgress, Paper, Typography } from '@mui/material';
import { marked } from 'marked';
import { observer } from 'mobx-react';
import { ObservedComponent } from 'mobx-react-helper';

import { FileModel } from '../../models/File';
import { i18n } from '../../models/Translation';
import { FilePreview } from '../FilePreview';
import { EvaluationDisplay } from './EvaluationDisplay';

export interface ChatMessageProps extends ConsultMessage {
  onFileParse?: (messageId: number, text: string) => any;
}

@observer
export class ChatMessage extends ObservedComponent<ChatMessageProps, typeof i18n> {
  fileStore = new FileModel();

  async componentDidMount() {
    super.componentDidMount();

    const { content, file } = this.props;

    if (!file || content) return;

    const text = await this.fileStore.getText(file);

    this.props.onFileParse?.(this.props.id, text);
  }

  render() {
    const { t } = this.observedContext,
      { project, id, content, file, evaluation, prototypes, createdAt, createdBy } = this.props;
    const isBot = createdBy.roles.includes(3 as UserRole.Robot);
    const avatarSrc = isBot ? '/robot-avatar.png' : createdBy?.avatar || '/default-avatar.png';
    const name = isBot ? `${t('ai_assistant')} 🤖` : createdBy?.name || 'User';

    return (
      <div
        className={`flex max-w-[95%] items-start gap-1 sm:max-w-[80%] ${isBot ? 'flex-row justify-self-start' : 'flex-row-reverse justify-self-end'}`}
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

          {file ? (
            <div className="mb-1">
              <FilePreview path={file} />

              {this.fileStore.downloading > 0 && (
                <div className="mt-1.5">
                  <Typography variant="caption" className="mb-1 block text-[0.7rem] opacity-80">
                    {t('parsing_file_text')}
                  </Typography>
                  <LinearProgress color="inherit" />
                </div>
              )}
            </div>
          ) : (
            content && (
              <Typography
                className="prose mb-1 text-[0.875rem] sm:text-base"
                variant="body2"
                dangerouslySetInnerHTML={{ __html: marked(content) }}
              />
            )
          )}
          {evaluation && (
            <EvaluationDisplay
              {...evaluation}
              projectId={project!.id}
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
    );
  }
}
