# Pulumi k8s custom resources

> Custom [Pulumi](https://www.pulumi.com/) Kubernetes resources for popular types, written in Typescript.

## What is included?

* For now only Cert-manager ClusterIssuer. More to come as I need more resources.

## Installation

```bash
yarn add @brpaz/pulumi-k8s-resources
```

## Usage

```ts
import { ClusterIssuer } from "@brpaz/pulumi-k8s-resources";

const clusterIssuer = new ClusterIssuer(
  "letsencrypt-prod",
  {
    name: "letsencrypt-prod",
    namespace: "cert-manager"
    acme: { // acme specification according to ClusterIssuer schema
        
    }
  }
);

```

For schema documentation see [here](https://github.com/jetstack/cert-manager/blob/master/deploy/charts/cert-manager/crds/clusterissuers.yaml)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## TODO

Investigate the better way to add type safety to the CRDs.

## License

[MIT](https://choosealicense.com/licenses/mit/)
