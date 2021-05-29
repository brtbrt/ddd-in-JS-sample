// @flow

import container from './services';
import type { Controller } from './controllers/Controller';

export function registerRoutes(router: express$Router<any, any>) {
    const taggedServices = container.findTaggedServiceIds('route');
    for (const definition of taggedServices.values()) {
        for (const tag of definition.tags) {
console.log('prima >>>>>>');
console.log(definition);
            register(
                tag.attributes.get('path'),
                tag.attributes.get('method').toLowerCase(),
                router,
                container.instanceManager.getInstanceFromDefinition(definition)
            );
console.log('dopo >>>>>>');
        }
    }
}

function register(
    routePath: string,
    method: string,
    router: express$Router<any, any>,
    controller: Controller
) {
    // $FlowIgnore: accessing the method via objecr prop
    router[method](routePath, (req: express$Request, res: express$Response) =>
        controller.run(req, res)
    );
}
