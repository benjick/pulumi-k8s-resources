import * as pulumi from '@pulumi/pulumi';
import { ClusterIssuer } from './index';

// beforeEach(() => {
//   pulumi.runtime.setMocks({});
// });

describe('ClusterIssuer', () => {
  test('It creates a ClusterIssuer object with the specified fields', () => {
    const clusterIssuer = new ClusterIssuer(
      'cluster-issuer',
      {
        name: 'cluster-issuer',
        acme: {
          email: 'test@gmail.com',
          privateKeySecretRef: {
            name: 'letsencrypt-prod',
          },
          server: 'https://acme-v02.api.letsencrypt.org/directory',
          solvers: [
            {
              http01: {
                ingress: {
                  class: 'nginx',
                },
              },
              selector: {},
            },
            {
              dns01: {
                cloudflare: {
                  apiKeySecretRef: {
                    key: 'apiKey',
                    name: 'cloudflare-api-key',
                  },
                  email: 'brunopaz@sapo.pt',
                },
              },
              selector: {
                dnsZones: ['brunopaz.dev'],
              },
            },
          ],
        },
      },
      {},
    );

    clusterIssuer.kind.apply((k) => {
      expect(k).toBe('ClusterIssuer');
    });

    const acme = clusterIssuer.getInputs().spec.acme;
    expect(acme.email).toBe('test@gmail.com');
    expect(acme.server).toBe('https://acme-v02.api.letsencrypt.org/directory');
    expect(acme.email).toBe('test@gmail.com');
    expect(acme.privateKeySecretRef.name).toBe('letsencrypt-prod');
    expect(acme.solvers.length).toBe(2);
  });
});
