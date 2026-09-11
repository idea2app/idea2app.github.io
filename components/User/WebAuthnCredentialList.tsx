import { UserCredential } from '@idea2app/data-server';
import { observer } from 'mobx-react';
import { FC, useContext } from 'react';

import { I18nContext, i18n } from '../../models/Translation';
import userCredentialStore from '../../models/UserCredential';
import userStore from '../../models/User';

import { Button } from '@/components/ui/button';
import { ScrollList } from '@/components/ui/mobx-restful-shadcn/scroll-list';

export interface WebAuthnCredentialListProps {
  email: string;
}

export const CredentialCard: FC<UserCredential> = observer(
  ({ id, uuid, transports = [], authenticator, synced, userVerified }) => {
    const { t } = useContext(I18nContext);

    return (
      <li className="border-border flex items-start justify-between gap-3 rounded-lg border p-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{authenticator?.name || 'WebAuthn'}</p>
          <p className="text-muted-foreground text-xs break-all">{uuid}</p>
          <p className="text-muted-foreground mt-1 text-xs">
            {[
              transports.join(', '),
              synced && t('credential_synced'),
              userVerified && t('user_verified'),
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={userCredentialStore.uploading > 0}
          onClick={() => userCredentialStore.deleteOne(id)}
        >
          {t('delete')}
        </Button>
      </li>
    );
  },
);

export const WebAuthnCredentialList: FC<WebAuthnCredentialListProps> = observer(({ email }) => {
  const { t } = useContext(I18nContext);
  const loading = userCredentialStore.uploading + userStore.uploading > 0;

  return (
    <section className="border-border flex flex-col gap-3 border-t pt-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-medium">{t('webauthn_credentials')}</h3>
          <p className="text-muted-foreground text-xs">{t('webauthn_credentials_description')}</p>
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={loading || !email}
          onClick={() => email && userCredentialStore.createOne(email)}
        >
          {t('create')}
        </Button>
      </div>

      <ScrollList
        className="max-h-60 overflow-y-auto pr-1"
        translator={i18n}
        store={userCredentialStore}
        renderList={allItems =>
          allItems[0] ? (
            <ul className="space-y-3">
              {allItems.map(credential => (
                <CredentialCard key={credential.id} {...credential} />
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground rounded-lg border border-dashed p-4 text-sm">
              {t('webauthn_credentials_empty')}
            </p>
          )
        }
      />
    </section>
  );
});
