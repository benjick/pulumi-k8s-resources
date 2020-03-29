import * as kubernetes from '@pulumi/kubernetes';
import { CustomResourceOptions, Input } from '@pulumi/pulumi';

type ClusterIssuerArgs = {
  name: string;
  acme: any;
  namespace?: Input<string>;
};

export class ClusterIssuer extends kubernetes.apiextensions.CustomResource {
  constructor(resourceName: string, resourceArgs: ClusterIssuerArgs, opts: Omit<CustomResourceOptions, 'provider'>) {
    const args: kubernetes.apiextensions.CustomResourceArgs = {
      apiVersion: 'cert-manager.io/v1alpha2',
      kind: 'ClusterIssuer',
      metadata: { annotations: {}, namespace: resourceArgs.namespace, name: resourceArgs.name },
      spec: {
        acme: resourceArgs.acme,
      },
    };
    super(resourceName, args, opts);
  }
}
