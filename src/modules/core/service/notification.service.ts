import * as admin from 'firebase-admin';
import serviceAccount = require('./../../../yuarsi-8dcd1-firebase-adminsdk-qw8q1-938c7aa166.json');
const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};
admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: 'https://sample-project-e1a84.firebaseio.com',
});
export class NotifcationService {
  public static async sendFCM(
    registrationToken: string,
    data: any,
    options: admin.messaging.MessagingOptions = null,
  ) {
    console.log(data)
    const notificationsOptions: admin.messaging.MessagingOptions = options
      ? options
      : {
          priority: 'high',
          timeToLive: 60 * 60 * 24,
        };
    // admin.messaging().send({ data: { }, notification: {}, android: {notification: {body: payload.data.bo}} token: registrationToken });
    admin.messaging().send({
      token: registrationToken,
      android: { data: data, notification: { body: data.body, title: data.title } },
    });
    // admin.messaging().sendToDevice(registrationToken, payload, notificationsOptions);
  }
}
