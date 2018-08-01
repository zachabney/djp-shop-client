/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Stripe
declare var stripe: any;
declare var elements: any;