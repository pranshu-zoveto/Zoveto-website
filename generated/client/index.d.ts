
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Lead
 * 
 */
export type Lead = $Result.DefaultSelection<Prisma.$LeadPayload>
/**
 * Model LeadStatusEvent
 * 
 */
export type LeadStatusEvent = $Result.DefaultSelection<Prisma.$LeadStatusEventPayload>
/**
 * Model BlogPost
 * 
 */
export type BlogPost = $Result.DefaultSelection<Prisma.$BlogPostPayload>
/**
 * Model TrackingEvent
 * 
 */
export type TrackingEvent = $Result.DefaultSelection<Prisma.$TrackingEventPayload>
/**
 * Model Deal
 * 
 */
export type Deal = $Result.DefaultSelection<Prisma.$DealPayload>
/**
 * Model AlertRule
 * 
 */
export type AlertRule = $Result.DefaultSelection<Prisma.$AlertRulePayload>
/**
 * Model AlertHistory
 * 
 */
export type AlertHistory = $Result.DefaultSelection<Prisma.$AlertHistoryPayload>
/**
 * Model NotificationTarget
 * 
 */
export type NotificationTarget = $Result.DefaultSelection<Prisma.$NotificationTargetPayload>
/**
 * Model SystemSetting
 * 
 */
export type SystemSetting = $Result.DefaultSelection<Prisma.$SystemSettingPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Integration
 * 
 */
export type Integration = $Result.DefaultSelection<Prisma.$IntegrationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Leads
 * const leads = await prisma.lead.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Leads
   * const leads = await prisma.lead.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.lead`: Exposes CRUD operations for the **Lead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leads
    * const leads = await prisma.lead.findMany()
    * ```
    */
  get lead(): Prisma.LeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leadStatusEvent`: Exposes CRUD operations for the **LeadStatusEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeadStatusEvents
    * const leadStatusEvents = await prisma.leadStatusEvent.findMany()
    * ```
    */
  get leadStatusEvent(): Prisma.LeadStatusEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blogPost`: Exposes CRUD operations for the **BlogPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogPosts
    * const blogPosts = await prisma.blogPost.findMany()
    * ```
    */
  get blogPost(): Prisma.BlogPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trackingEvent`: Exposes CRUD operations for the **TrackingEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TrackingEvents
    * const trackingEvents = await prisma.trackingEvent.findMany()
    * ```
    */
  get trackingEvent(): Prisma.TrackingEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deal`: Exposes CRUD operations for the **Deal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Deals
    * const deals = await prisma.deal.findMany()
    * ```
    */
  get deal(): Prisma.DealDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alertRule`: Exposes CRUD operations for the **AlertRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlertRules
    * const alertRules = await prisma.alertRule.findMany()
    * ```
    */
  get alertRule(): Prisma.AlertRuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alertHistory`: Exposes CRUD operations for the **AlertHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlertHistories
    * const alertHistories = await prisma.alertHistory.findMany()
    * ```
    */
  get alertHistory(): Prisma.AlertHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notificationTarget`: Exposes CRUD operations for the **NotificationTarget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NotificationTargets
    * const notificationTargets = await prisma.notificationTarget.findMany()
    * ```
    */
  get notificationTarget(): Prisma.NotificationTargetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemSettings
    * const systemSettings = await prisma.systemSetting.findMany()
    * ```
    */
  get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.integration`: Exposes CRUD operations for the **Integration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Integrations
    * const integrations = await prisma.integration.findMany()
    * ```
    */
  get integration(): Prisma.IntegrationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Lead: 'Lead',
    LeadStatusEvent: 'LeadStatusEvent',
    BlogPost: 'BlogPost',
    TrackingEvent: 'TrackingEvent',
    Deal: 'Deal',
    AlertRule: 'AlertRule',
    AlertHistory: 'AlertHistory',
    NotificationTarget: 'NotificationTarget',
    SystemSetting: 'SystemSetting',
    AuditLog: 'AuditLog',
    Integration: 'Integration'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "lead" | "leadStatusEvent" | "blogPost" | "trackingEvent" | "deal" | "alertRule" | "alertHistory" | "notificationTarget" | "systemSetting" | "auditLog" | "integration"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Lead: {
        payload: Prisma.$LeadPayload<ExtArgs>
        fields: Prisma.LeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findFirst: {
            args: Prisma.LeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          findMany: {
            args: Prisma.LeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          create: {
            args: Prisma.LeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          createMany: {
            args: Prisma.LeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          delete: {
            args: Prisma.LeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          update: {
            args: Prisma.LeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          deleteMany: {
            args: Prisma.LeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>[]
          }
          upsert: {
            args: Prisma.LeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadPayload>
          }
          aggregate: {
            args: Prisma.LeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLead>
          }
          groupBy: {
            args: Prisma.LeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadCountArgs<ExtArgs>
            result: $Utils.Optional<LeadCountAggregateOutputType> | number
          }
        }
      }
      LeadStatusEvent: {
        payload: Prisma.$LeadStatusEventPayload<ExtArgs>
        fields: Prisma.LeadStatusEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeadStatusEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeadStatusEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>
          }
          findFirst: {
            args: Prisma.LeadStatusEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeadStatusEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>
          }
          findMany: {
            args: Prisma.LeadStatusEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>[]
          }
          create: {
            args: Prisma.LeadStatusEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>
          }
          createMany: {
            args: Prisma.LeadStatusEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeadStatusEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>[]
          }
          delete: {
            args: Prisma.LeadStatusEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>
          }
          update: {
            args: Prisma.LeadStatusEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>
          }
          deleteMany: {
            args: Prisma.LeadStatusEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeadStatusEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeadStatusEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>[]
          }
          upsert: {
            args: Prisma.LeadStatusEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeadStatusEventPayload>
          }
          aggregate: {
            args: Prisma.LeadStatusEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeadStatusEvent>
          }
          groupBy: {
            args: Prisma.LeadStatusEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeadStatusEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeadStatusEventCountArgs<ExtArgs>
            result: $Utils.Optional<LeadStatusEventCountAggregateOutputType> | number
          }
        }
      }
      BlogPost: {
        payload: Prisma.$BlogPostPayload<ExtArgs>
        fields: Prisma.BlogPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findFirst: {
            args: Prisma.BlogPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findMany: {
            args: Prisma.BlogPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          create: {
            args: Prisma.BlogPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          createMany: {
            args: Prisma.BlogPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          delete: {
            args: Prisma.BlogPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          update: {
            args: Prisma.BlogPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          deleteMany: {
            args: Prisma.BlogPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlogPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          upsert: {
            args: Prisma.BlogPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          aggregate: {
            args: Prisma.BlogPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogPost>
          }
          groupBy: {
            args: Prisma.BlogPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogPostCountArgs<ExtArgs>
            result: $Utils.Optional<BlogPostCountAggregateOutputType> | number
          }
        }
      }
      TrackingEvent: {
        payload: Prisma.$TrackingEventPayload<ExtArgs>
        fields: Prisma.TrackingEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackingEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackingEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          findFirst: {
            args: Prisma.TrackingEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackingEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          findMany: {
            args: Prisma.TrackingEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>[]
          }
          create: {
            args: Prisma.TrackingEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          createMany: {
            args: Prisma.TrackingEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrackingEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>[]
          }
          delete: {
            args: Prisma.TrackingEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          update: {
            args: Prisma.TrackingEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          deleteMany: {
            args: Prisma.TrackingEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackingEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrackingEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>[]
          }
          upsert: {
            args: Prisma.TrackingEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackingEventPayload>
          }
          aggregate: {
            args: Prisma.TrackingEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrackingEvent>
          }
          groupBy: {
            args: Prisma.TrackingEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackingEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackingEventCountArgs<ExtArgs>
            result: $Utils.Optional<TrackingEventCountAggregateOutputType> | number
          }
        }
      }
      Deal: {
        payload: Prisma.$DealPayload<ExtArgs>
        fields: Prisma.DealFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DealFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DealFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          findFirst: {
            args: Prisma.DealFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DealFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          findMany: {
            args: Prisma.DealFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          create: {
            args: Prisma.DealCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          createMany: {
            args: Prisma.DealCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DealCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          delete: {
            args: Prisma.DealDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          update: {
            args: Prisma.DealUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          deleteMany: {
            args: Prisma.DealDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DealUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DealUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>[]
          }
          upsert: {
            args: Prisma.DealUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DealPayload>
          }
          aggregate: {
            args: Prisma.DealAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeal>
          }
          groupBy: {
            args: Prisma.DealGroupByArgs<ExtArgs>
            result: $Utils.Optional<DealGroupByOutputType>[]
          }
          count: {
            args: Prisma.DealCountArgs<ExtArgs>
            result: $Utils.Optional<DealCountAggregateOutputType> | number
          }
        }
      }
      AlertRule: {
        payload: Prisma.$AlertRulePayload<ExtArgs>
        fields: Prisma.AlertRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          findFirst: {
            args: Prisma.AlertRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          findMany: {
            args: Prisma.AlertRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>[]
          }
          create: {
            args: Prisma.AlertRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          createMany: {
            args: Prisma.AlertRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>[]
          }
          delete: {
            args: Prisma.AlertRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          update: {
            args: Prisma.AlertRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          deleteMany: {
            args: Prisma.AlertRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlertRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>[]
          }
          upsert: {
            args: Prisma.AlertRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRulePayload>
          }
          aggregate: {
            args: Prisma.AlertRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlertRule>
          }
          groupBy: {
            args: Prisma.AlertRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertRuleCountArgs<ExtArgs>
            result: $Utils.Optional<AlertRuleCountAggregateOutputType> | number
          }
        }
      }
      AlertHistory: {
        payload: Prisma.$AlertHistoryPayload<ExtArgs>
        fields: Prisma.AlertHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          findFirst: {
            args: Prisma.AlertHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          findMany: {
            args: Prisma.AlertHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>[]
          }
          create: {
            args: Prisma.AlertHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          createMany: {
            args: Prisma.AlertHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>[]
          }
          delete: {
            args: Prisma.AlertHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          update: {
            args: Prisma.AlertHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          deleteMany: {
            args: Prisma.AlertHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlertHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>[]
          }
          upsert: {
            args: Prisma.AlertHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          aggregate: {
            args: Prisma.AlertHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlertHistory>
          }
          groupBy: {
            args: Prisma.AlertHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<AlertHistoryCountAggregateOutputType> | number
          }
        }
      }
      NotificationTarget: {
        payload: Prisma.$NotificationTargetPayload<ExtArgs>
        fields: Prisma.NotificationTargetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationTargetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationTargetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>
          }
          findFirst: {
            args: Prisma.NotificationTargetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationTargetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>
          }
          findMany: {
            args: Prisma.NotificationTargetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>[]
          }
          create: {
            args: Prisma.NotificationTargetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>
          }
          createMany: {
            args: Prisma.NotificationTargetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationTargetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>[]
          }
          delete: {
            args: Prisma.NotificationTargetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>
          }
          update: {
            args: Prisma.NotificationTargetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>
          }
          deleteMany: {
            args: Prisma.NotificationTargetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationTargetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationTargetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>[]
          }
          upsert: {
            args: Prisma.NotificationTargetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationTargetPayload>
          }
          aggregate: {
            args: Prisma.NotificationTargetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotificationTarget>
          }
          groupBy: {
            args: Prisma.NotificationTargetGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationTargetGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationTargetCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationTargetCountAggregateOutputType> | number
          }
        }
      }
      SystemSetting: {
        payload: Prisma.$SystemSettingPayload<ExtArgs>
        fields: Prisma.SystemSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findFirst: {
            args: Prisma.SystemSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findMany: {
            args: Prisma.SystemSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          create: {
            args: Prisma.SystemSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          createMany: {
            args: Prisma.SystemSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          delete: {
            args: Prisma.SystemSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          update: {
            args: Prisma.SystemSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          deleteMany: {
            args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          upsert: {
            args: Prisma.SystemSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          aggregate: {
            args: Prisma.SystemSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemSetting>
          }
          groupBy: {
            args: Prisma.SystemSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Integration: {
        payload: Prisma.$IntegrationPayload<ExtArgs>
        fields: Prisma.IntegrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IntegrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IntegrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>
          }
          findFirst: {
            args: Prisma.IntegrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IntegrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>
          }
          findMany: {
            args: Prisma.IntegrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>[]
          }
          create: {
            args: Prisma.IntegrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>
          }
          createMany: {
            args: Prisma.IntegrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IntegrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>[]
          }
          delete: {
            args: Prisma.IntegrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>
          }
          update: {
            args: Prisma.IntegrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>
          }
          deleteMany: {
            args: Prisma.IntegrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IntegrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IntegrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>[]
          }
          upsert: {
            args: Prisma.IntegrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IntegrationPayload>
          }
          aggregate: {
            args: Prisma.IntegrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIntegration>
          }
          groupBy: {
            args: Prisma.IntegrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<IntegrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.IntegrationCountArgs<ExtArgs>
            result: $Utils.Optional<IntegrationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    lead?: LeadOmit
    leadStatusEvent?: LeadStatusEventOmit
    blogPost?: BlogPostOmit
    trackingEvent?: TrackingEventOmit
    deal?: DealOmit
    alertRule?: AlertRuleOmit
    alertHistory?: AlertHistoryOmit
    notificationTarget?: NotificationTargetOmit
    systemSetting?: SystemSettingOmit
    auditLog?: AuditLogOmit
    integration?: IntegrationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LeadCountOutputType
   */

  export type LeadCountOutputType = {
    statusHistory: number
    deals: number
  }

  export type LeadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | LeadCountOutputTypeCountStatusHistoryArgs
    deals?: boolean | LeadCountOutputTypeCountDealsArgs
  }

  // Custom InputTypes
  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadCountOutputType
     */
    select?: LeadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountStatusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadStatusEventWhereInput
  }

  /**
   * LeadCountOutputType without action
   */
  export type LeadCountOutputTypeCountDealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
  }


  /**
   * Count Type AlertRuleCountOutputType
   */

  export type AlertRuleCountOutputType = {
    history: number
  }

  export type AlertRuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | AlertRuleCountOutputTypeCountHistoryArgs
  }

  // Custom InputTypes
  /**
   * AlertRuleCountOutputType without action
   */
  export type AlertRuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRuleCountOutputType
     */
    select?: AlertRuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlertRuleCountOutputType without action
   */
  export type AlertRuleCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Lead
   */

  export type AggregateLead = {
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  export type LeadAvgAggregateOutputType = {
    score: number | null
  }

  export type LeadSumAggregateOutputType = {
    score: number | null
  }

  export type LeadMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    company: string | null
    phone: string | null
    intent: string | null
    notes: string | null
    status: string | null
    score: number | null
    sourceUrl: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmTerm: string | null
    utmContent: string | null
    referrer: string | null
    respondedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    company: string | null
    phone: string | null
    intent: string | null
    notes: string | null
    status: string | null
    score: number | null
    sourceUrl: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmTerm: string | null
    utmContent: string | null
    referrer: string | null
    respondedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeadCountAggregateOutputType = {
    id: number
    name: number
    email: number
    company: number
    phone: number
    intent: number
    notes: number
    status: number
    score: number
    sourceUrl: number
    utmSource: number
    utmMedium: number
    utmCampaign: number
    utmTerm: number
    utmContent: number
    referrer: number
    respondedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeadAvgAggregateInputType = {
    score?: true
  }

  export type LeadSumAggregateInputType = {
    score?: true
  }

  export type LeadMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    company?: true
    phone?: true
    intent?: true
    notes?: true
    status?: true
    score?: true
    sourceUrl?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmTerm?: true
    utmContent?: true
    referrer?: true
    respondedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    company?: true
    phone?: true
    intent?: true
    notes?: true
    status?: true
    score?: true
    sourceUrl?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmTerm?: true
    utmContent?: true
    referrer?: true
    respondedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeadCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    company?: true
    phone?: true
    intent?: true
    notes?: true
    status?: true
    score?: true
    sourceUrl?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    utmTerm?: true
    utmContent?: true
    referrer?: true
    respondedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lead to aggregate.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leads
    **/
    _count?: true | LeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadMaxAggregateInputType
  }

  export type GetLeadAggregateType<T extends LeadAggregateArgs> = {
        [P in keyof T & keyof AggregateLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLead[P]>
      : GetScalarType<T[P], AggregateLead[P]>
  }




  export type LeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadWhereInput
    orderBy?: LeadOrderByWithAggregationInput | LeadOrderByWithAggregationInput[]
    by: LeadScalarFieldEnum[] | LeadScalarFieldEnum
    having?: LeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadCountAggregateInputType | true
    _avg?: LeadAvgAggregateInputType
    _sum?: LeadSumAggregateInputType
    _min?: LeadMinAggregateInputType
    _max?: LeadMaxAggregateInputType
  }

  export type LeadGroupByOutputType = {
    id: string
    name: string
    email: string
    company: string | null
    phone: string | null
    intent: string | null
    notes: string | null
    status: string
    score: number
    sourceUrl: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    utmTerm: string | null
    utmContent: string | null
    referrer: string | null
    respondedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: LeadCountAggregateOutputType | null
    _avg: LeadAvgAggregateOutputType | null
    _sum: LeadSumAggregateOutputType | null
    _min: LeadMinAggregateOutputType | null
    _max: LeadMaxAggregateOutputType | null
  }

  type GetLeadGroupByPayload<T extends LeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadGroupByOutputType[P]>
            : GetScalarType<T[P], LeadGroupByOutputType[P]>
        }
      >
    >


  export type LeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    company?: boolean
    phone?: boolean
    intent?: boolean
    notes?: boolean
    status?: boolean
    score?: boolean
    sourceUrl?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmTerm?: boolean
    utmContent?: boolean
    referrer?: boolean
    respondedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    statusHistory?: boolean | Lead$statusHistoryArgs<ExtArgs>
    deals?: boolean | Lead$dealsArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    company?: boolean
    phone?: boolean
    intent?: boolean
    notes?: boolean
    status?: boolean
    score?: boolean
    sourceUrl?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmTerm?: boolean
    utmContent?: boolean
    referrer?: boolean
    respondedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    company?: boolean
    phone?: boolean
    intent?: boolean
    notes?: boolean
    status?: boolean
    score?: boolean
    sourceUrl?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmTerm?: boolean
    utmContent?: boolean
    referrer?: boolean
    respondedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["lead"]>

  export type LeadSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    company?: boolean
    phone?: boolean
    intent?: boolean
    notes?: boolean
    status?: boolean
    score?: boolean
    sourceUrl?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    utmTerm?: boolean
    utmContent?: boolean
    referrer?: boolean
    respondedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "company" | "phone" | "intent" | "notes" | "status" | "score" | "sourceUrl" | "utmSource" | "utmMedium" | "utmCampaign" | "utmTerm" | "utmContent" | "referrer" | "respondedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["lead"]>
  export type LeadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    statusHistory?: boolean | Lead$statusHistoryArgs<ExtArgs>
    deals?: boolean | Lead$dealsArgs<ExtArgs>
    _count?: boolean | LeadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LeadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lead"
    objects: {
      statusHistory: Prisma.$LeadStatusEventPayload<ExtArgs>[]
      deals: Prisma.$DealPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      company: string | null
      phone: string | null
      intent: string | null
      notes: string | null
      status: string
      score: number
      sourceUrl: string | null
      utmSource: string | null
      utmMedium: string | null
      utmCampaign: string | null
      utmTerm: string | null
      utmContent: string | null
      referrer: string | null
      respondedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lead"]>
    composites: {}
  }

  type LeadGetPayload<S extends boolean | null | undefined | LeadDefaultArgs> = $Result.GetResult<Prisma.$LeadPayload, S>

  type LeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadCountAggregateInputType | true
    }

  export interface LeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lead'], meta: { name: 'Lead' } }
    /**
     * Find zero or one Lead that matches the filter.
     * @param {LeadFindUniqueArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadFindUniqueArgs>(args: SelectSubset<T, LeadFindUniqueArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadFindUniqueOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadFindFirstArgs>(args?: SelectSubset<T, LeadFindFirstArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindFirstOrThrowArgs} args - Arguments to find a Lead
     * @example
     * // Get one Lead
     * const lead = await prisma.lead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leads
     * const leads = await prisma.lead.findMany()
     * 
     * // Get first 10 Leads
     * const leads = await prisma.lead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadWithIdOnly = await prisma.lead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadFindManyArgs>(args?: SelectSubset<T, LeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lead.
     * @param {LeadCreateArgs} args - Arguments to create a Lead.
     * @example
     * // Create one Lead
     * const Lead = await prisma.lead.create({
     *   data: {
     *     // ... data to create a Lead
     *   }
     * })
     * 
     */
    create<T extends LeadCreateArgs>(args: SelectSubset<T, LeadCreateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leads.
     * @param {LeadCreateManyArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadCreateManyArgs>(args?: SelectSubset<T, LeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leads and returns the data saved in the database.
     * @param {LeadCreateManyAndReturnArgs} args - Arguments to create many Leads.
     * @example
     * // Create many Leads
     * const lead = await prisma.lead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lead.
     * @param {LeadDeleteArgs} args - Arguments to delete one Lead.
     * @example
     * // Delete one Lead
     * const Lead = await prisma.lead.delete({
     *   where: {
     *     // ... filter to delete one Lead
     *   }
     * })
     * 
     */
    delete<T extends LeadDeleteArgs>(args: SelectSubset<T, LeadDeleteArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lead.
     * @param {LeadUpdateArgs} args - Arguments to update one Lead.
     * @example
     * // Update one Lead
     * const lead = await prisma.lead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadUpdateArgs>(args: SelectSubset<T, LeadUpdateArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leads.
     * @param {LeadDeleteManyArgs} args - Arguments to filter Leads to delete.
     * @example
     * // Delete a few Leads
     * const { count } = await prisma.lead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadDeleteManyArgs>(args?: SelectSubset<T, LeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadUpdateManyArgs>(args: SelectSubset<T, LeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leads and returns the data updated in the database.
     * @param {LeadUpdateManyAndReturnArgs} args - Arguments to update many Leads.
     * @example
     * // Update many Leads
     * const lead = await prisma.lead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leads and only return the `id`
     * const leadWithIdOnly = await prisma.lead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lead.
     * @param {LeadUpsertArgs} args - Arguments to update or create a Lead.
     * @example
     * // Update or create a Lead
     * const lead = await prisma.lead.upsert({
     *   create: {
     *     // ... data to create a Lead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lead we want to update
     *   }
     * })
     */
    upsert<T extends LeadUpsertArgs>(args: SelectSubset<T, LeadUpsertArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadCountArgs} args - Arguments to filter Leads to count.
     * @example
     * // Count the number of Leads
     * const count = await prisma.lead.count({
     *   where: {
     *     // ... the filter for the Leads we want to count
     *   }
     * })
    **/
    count<T extends LeadCountArgs>(
      args?: Subset<T, LeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadAggregateArgs>(args: Subset<T, LeadAggregateArgs>): Prisma.PrismaPromise<GetLeadAggregateType<T>>

    /**
     * Group by Lead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadGroupByArgs['orderBy'] }
        : { orderBy?: LeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lead model
   */
  readonly fields: LeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    statusHistory<T extends Lead$statusHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Lead$statusHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    deals<T extends Lead$dealsArgs<ExtArgs> = {}>(args?: Subset<T, Lead$dealsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lead model
   */
  interface LeadFieldRefs {
    readonly id: FieldRef<"Lead", 'String'>
    readonly name: FieldRef<"Lead", 'String'>
    readonly email: FieldRef<"Lead", 'String'>
    readonly company: FieldRef<"Lead", 'String'>
    readonly phone: FieldRef<"Lead", 'String'>
    readonly intent: FieldRef<"Lead", 'String'>
    readonly notes: FieldRef<"Lead", 'String'>
    readonly status: FieldRef<"Lead", 'String'>
    readonly score: FieldRef<"Lead", 'Int'>
    readonly sourceUrl: FieldRef<"Lead", 'String'>
    readonly utmSource: FieldRef<"Lead", 'String'>
    readonly utmMedium: FieldRef<"Lead", 'String'>
    readonly utmCampaign: FieldRef<"Lead", 'String'>
    readonly utmTerm: FieldRef<"Lead", 'String'>
    readonly utmContent: FieldRef<"Lead", 'String'>
    readonly referrer: FieldRef<"Lead", 'String'>
    readonly respondedAt: FieldRef<"Lead", 'DateTime'>
    readonly createdAt: FieldRef<"Lead", 'DateTime'>
    readonly updatedAt: FieldRef<"Lead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lead findUnique
   */
  export type LeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findUniqueOrThrow
   */
  export type LeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead findFirst
   */
  export type LeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findFirstOrThrow
   */
  export type LeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Lead to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead findMany
   */
  export type LeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter, which Leads to fetch.
     */
    where?: LeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leads to fetch.
     */
    orderBy?: LeadOrderByWithRelationInput | LeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leads.
     */
    cursor?: LeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leads.
     */
    distinct?: LeadScalarFieldEnum | LeadScalarFieldEnum[]
  }

  /**
   * Lead create
   */
  export type LeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to create a Lead.
     */
    data: XOR<LeadCreateInput, LeadUncheckedCreateInput>
  }

  /**
   * Lead createMany
   */
  export type LeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead createManyAndReturn
   */
  export type LeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to create many Leads.
     */
    data: LeadCreateManyInput | LeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lead update
   */
  export type LeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The data needed to update a Lead.
     */
    data: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
    /**
     * Choose, which Lead to update.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead updateMany
   */
  export type LeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead updateManyAndReturn
   */
  export type LeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * The data used to update Leads.
     */
    data: XOR<LeadUpdateManyMutationInput, LeadUncheckedUpdateManyInput>
    /**
     * Filter which Leads to update
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to update.
     */
    limit?: number
  }

  /**
   * Lead upsert
   */
  export type LeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * The filter to search for the Lead to update in case it exists.
     */
    where: LeadWhereUniqueInput
    /**
     * In case the Lead found by the `where` argument doesn't exist, create a new Lead with this data.
     */
    create: XOR<LeadCreateInput, LeadUncheckedCreateInput>
    /**
     * In case the Lead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadUpdateInput, LeadUncheckedUpdateInput>
  }

  /**
   * Lead delete
   */
  export type LeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    /**
     * Filter which Lead to delete.
     */
    where: LeadWhereUniqueInput
  }

  /**
   * Lead deleteMany
   */
  export type LeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leads to delete
     */
    where?: LeadWhereInput
    /**
     * Limit how many Leads to delete.
     */
    limit?: number
  }

  /**
   * Lead.statusHistory
   */
  export type Lead$statusHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    where?: LeadStatusEventWhereInput
    orderBy?: LeadStatusEventOrderByWithRelationInput | LeadStatusEventOrderByWithRelationInput[]
    cursor?: LeadStatusEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeadStatusEventScalarFieldEnum | LeadStatusEventScalarFieldEnum[]
  }

  /**
   * Lead.deals
   */
  export type Lead$dealsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    where?: DealWhereInput
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    cursor?: DealWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Lead without action
   */
  export type LeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
  }


  /**
   * Model LeadStatusEvent
   */

  export type AggregateLeadStatusEvent = {
    _count: LeadStatusEventCountAggregateOutputType | null
    _min: LeadStatusEventMinAggregateOutputType | null
    _max: LeadStatusEventMaxAggregateOutputType | null
  }

  export type LeadStatusEventMinAggregateOutputType = {
    id: string | null
    leadId: string | null
    fromStatus: string | null
    toStatus: string | null
    note: string | null
    createdAt: Date | null
  }

  export type LeadStatusEventMaxAggregateOutputType = {
    id: string | null
    leadId: string | null
    fromStatus: string | null
    toStatus: string | null
    note: string | null
    createdAt: Date | null
  }

  export type LeadStatusEventCountAggregateOutputType = {
    id: number
    leadId: number
    fromStatus: number
    toStatus: number
    note: number
    createdAt: number
    _all: number
  }


  export type LeadStatusEventMinAggregateInputType = {
    id?: true
    leadId?: true
    fromStatus?: true
    toStatus?: true
    note?: true
    createdAt?: true
  }

  export type LeadStatusEventMaxAggregateInputType = {
    id?: true
    leadId?: true
    fromStatus?: true
    toStatus?: true
    note?: true
    createdAt?: true
  }

  export type LeadStatusEventCountAggregateInputType = {
    id?: true
    leadId?: true
    fromStatus?: true
    toStatus?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type LeadStatusEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadStatusEvent to aggregate.
     */
    where?: LeadStatusEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadStatusEvents to fetch.
     */
    orderBy?: LeadStatusEventOrderByWithRelationInput | LeadStatusEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeadStatusEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadStatusEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadStatusEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeadStatusEvents
    **/
    _count?: true | LeadStatusEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeadStatusEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeadStatusEventMaxAggregateInputType
  }

  export type GetLeadStatusEventAggregateType<T extends LeadStatusEventAggregateArgs> = {
        [P in keyof T & keyof AggregateLeadStatusEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeadStatusEvent[P]>
      : GetScalarType<T[P], AggregateLeadStatusEvent[P]>
  }




  export type LeadStatusEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeadStatusEventWhereInput
    orderBy?: LeadStatusEventOrderByWithAggregationInput | LeadStatusEventOrderByWithAggregationInput[]
    by: LeadStatusEventScalarFieldEnum[] | LeadStatusEventScalarFieldEnum
    having?: LeadStatusEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeadStatusEventCountAggregateInputType | true
    _min?: LeadStatusEventMinAggregateInputType
    _max?: LeadStatusEventMaxAggregateInputType
  }

  export type LeadStatusEventGroupByOutputType = {
    id: string
    leadId: string
    fromStatus: string
    toStatus: string
    note: string | null
    createdAt: Date
    _count: LeadStatusEventCountAggregateOutputType | null
    _min: LeadStatusEventMinAggregateOutputType | null
    _max: LeadStatusEventMaxAggregateOutputType | null
  }

  type GetLeadStatusEventGroupByPayload<T extends LeadStatusEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeadStatusEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeadStatusEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeadStatusEventGroupByOutputType[P]>
            : GetScalarType<T[P], LeadStatusEventGroupByOutputType[P]>
        }
      >
    >


  export type LeadStatusEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    note?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadStatusEvent"]>

  export type LeadStatusEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    note?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadStatusEvent"]>

  export type LeadStatusEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leadId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    note?: boolean
    createdAt?: boolean
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leadStatusEvent"]>

  export type LeadStatusEventSelectScalar = {
    id?: boolean
    leadId?: boolean
    fromStatus?: boolean
    toStatus?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type LeadStatusEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "leadId" | "fromStatus" | "toStatus" | "note" | "createdAt", ExtArgs["result"]["leadStatusEvent"]>
  export type LeadStatusEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type LeadStatusEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }
  export type LeadStatusEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | LeadDefaultArgs<ExtArgs>
  }

  export type $LeadStatusEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeadStatusEvent"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leadId: string
      fromStatus: string
      toStatus: string
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["leadStatusEvent"]>
    composites: {}
  }

  type LeadStatusEventGetPayload<S extends boolean | null | undefined | LeadStatusEventDefaultArgs> = $Result.GetResult<Prisma.$LeadStatusEventPayload, S>

  type LeadStatusEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeadStatusEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeadStatusEventCountAggregateInputType | true
    }

  export interface LeadStatusEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeadStatusEvent'], meta: { name: 'LeadStatusEvent' } }
    /**
     * Find zero or one LeadStatusEvent that matches the filter.
     * @param {LeadStatusEventFindUniqueArgs} args - Arguments to find a LeadStatusEvent
     * @example
     * // Get one LeadStatusEvent
     * const leadStatusEvent = await prisma.leadStatusEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeadStatusEventFindUniqueArgs>(args: SelectSubset<T, LeadStatusEventFindUniqueArgs<ExtArgs>>): Prisma__LeadStatusEventClient<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeadStatusEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeadStatusEventFindUniqueOrThrowArgs} args - Arguments to find a LeadStatusEvent
     * @example
     * // Get one LeadStatusEvent
     * const leadStatusEvent = await prisma.leadStatusEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeadStatusEventFindUniqueOrThrowArgs>(args: SelectSubset<T, LeadStatusEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeadStatusEventClient<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadStatusEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadStatusEventFindFirstArgs} args - Arguments to find a LeadStatusEvent
     * @example
     * // Get one LeadStatusEvent
     * const leadStatusEvent = await prisma.leadStatusEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeadStatusEventFindFirstArgs>(args?: SelectSubset<T, LeadStatusEventFindFirstArgs<ExtArgs>>): Prisma__LeadStatusEventClient<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeadStatusEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadStatusEventFindFirstOrThrowArgs} args - Arguments to find a LeadStatusEvent
     * @example
     * // Get one LeadStatusEvent
     * const leadStatusEvent = await prisma.leadStatusEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeadStatusEventFindFirstOrThrowArgs>(args?: SelectSubset<T, LeadStatusEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeadStatusEventClient<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeadStatusEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadStatusEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeadStatusEvents
     * const leadStatusEvents = await prisma.leadStatusEvent.findMany()
     * 
     * // Get first 10 LeadStatusEvents
     * const leadStatusEvents = await prisma.leadStatusEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leadStatusEventWithIdOnly = await prisma.leadStatusEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeadStatusEventFindManyArgs>(args?: SelectSubset<T, LeadStatusEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeadStatusEvent.
     * @param {LeadStatusEventCreateArgs} args - Arguments to create a LeadStatusEvent.
     * @example
     * // Create one LeadStatusEvent
     * const LeadStatusEvent = await prisma.leadStatusEvent.create({
     *   data: {
     *     // ... data to create a LeadStatusEvent
     *   }
     * })
     * 
     */
    create<T extends LeadStatusEventCreateArgs>(args: SelectSubset<T, LeadStatusEventCreateArgs<ExtArgs>>): Prisma__LeadStatusEventClient<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeadStatusEvents.
     * @param {LeadStatusEventCreateManyArgs} args - Arguments to create many LeadStatusEvents.
     * @example
     * // Create many LeadStatusEvents
     * const leadStatusEvent = await prisma.leadStatusEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeadStatusEventCreateManyArgs>(args?: SelectSubset<T, LeadStatusEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeadStatusEvents and returns the data saved in the database.
     * @param {LeadStatusEventCreateManyAndReturnArgs} args - Arguments to create many LeadStatusEvents.
     * @example
     * // Create many LeadStatusEvents
     * const leadStatusEvent = await prisma.leadStatusEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeadStatusEvents and only return the `id`
     * const leadStatusEventWithIdOnly = await prisma.leadStatusEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeadStatusEventCreateManyAndReturnArgs>(args?: SelectSubset<T, LeadStatusEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeadStatusEvent.
     * @param {LeadStatusEventDeleteArgs} args - Arguments to delete one LeadStatusEvent.
     * @example
     * // Delete one LeadStatusEvent
     * const LeadStatusEvent = await prisma.leadStatusEvent.delete({
     *   where: {
     *     // ... filter to delete one LeadStatusEvent
     *   }
     * })
     * 
     */
    delete<T extends LeadStatusEventDeleteArgs>(args: SelectSubset<T, LeadStatusEventDeleteArgs<ExtArgs>>): Prisma__LeadStatusEventClient<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeadStatusEvent.
     * @param {LeadStatusEventUpdateArgs} args - Arguments to update one LeadStatusEvent.
     * @example
     * // Update one LeadStatusEvent
     * const leadStatusEvent = await prisma.leadStatusEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeadStatusEventUpdateArgs>(args: SelectSubset<T, LeadStatusEventUpdateArgs<ExtArgs>>): Prisma__LeadStatusEventClient<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeadStatusEvents.
     * @param {LeadStatusEventDeleteManyArgs} args - Arguments to filter LeadStatusEvents to delete.
     * @example
     * // Delete a few LeadStatusEvents
     * const { count } = await prisma.leadStatusEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeadStatusEventDeleteManyArgs>(args?: SelectSubset<T, LeadStatusEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadStatusEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadStatusEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeadStatusEvents
     * const leadStatusEvent = await prisma.leadStatusEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeadStatusEventUpdateManyArgs>(args: SelectSubset<T, LeadStatusEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeadStatusEvents and returns the data updated in the database.
     * @param {LeadStatusEventUpdateManyAndReturnArgs} args - Arguments to update many LeadStatusEvents.
     * @example
     * // Update many LeadStatusEvents
     * const leadStatusEvent = await prisma.leadStatusEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeadStatusEvents and only return the `id`
     * const leadStatusEventWithIdOnly = await prisma.leadStatusEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeadStatusEventUpdateManyAndReturnArgs>(args: SelectSubset<T, LeadStatusEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeadStatusEvent.
     * @param {LeadStatusEventUpsertArgs} args - Arguments to update or create a LeadStatusEvent.
     * @example
     * // Update or create a LeadStatusEvent
     * const leadStatusEvent = await prisma.leadStatusEvent.upsert({
     *   create: {
     *     // ... data to create a LeadStatusEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeadStatusEvent we want to update
     *   }
     * })
     */
    upsert<T extends LeadStatusEventUpsertArgs>(args: SelectSubset<T, LeadStatusEventUpsertArgs<ExtArgs>>): Prisma__LeadStatusEventClient<$Result.GetResult<Prisma.$LeadStatusEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeadStatusEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadStatusEventCountArgs} args - Arguments to filter LeadStatusEvents to count.
     * @example
     * // Count the number of LeadStatusEvents
     * const count = await prisma.leadStatusEvent.count({
     *   where: {
     *     // ... the filter for the LeadStatusEvents we want to count
     *   }
     * })
    **/
    count<T extends LeadStatusEventCountArgs>(
      args?: Subset<T, LeadStatusEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeadStatusEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeadStatusEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadStatusEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeadStatusEventAggregateArgs>(args: Subset<T, LeadStatusEventAggregateArgs>): Prisma.PrismaPromise<GetLeadStatusEventAggregateType<T>>

    /**
     * Group by LeadStatusEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeadStatusEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeadStatusEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeadStatusEventGroupByArgs['orderBy'] }
        : { orderBy?: LeadStatusEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeadStatusEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeadStatusEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeadStatusEvent model
   */
  readonly fields: LeadStatusEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeadStatusEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeadStatusEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends LeadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeadDefaultArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeadStatusEvent model
   */
  interface LeadStatusEventFieldRefs {
    readonly id: FieldRef<"LeadStatusEvent", 'String'>
    readonly leadId: FieldRef<"LeadStatusEvent", 'String'>
    readonly fromStatus: FieldRef<"LeadStatusEvent", 'String'>
    readonly toStatus: FieldRef<"LeadStatusEvent", 'String'>
    readonly note: FieldRef<"LeadStatusEvent", 'String'>
    readonly createdAt: FieldRef<"LeadStatusEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeadStatusEvent findUnique
   */
  export type LeadStatusEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadStatusEvent to fetch.
     */
    where: LeadStatusEventWhereUniqueInput
  }

  /**
   * LeadStatusEvent findUniqueOrThrow
   */
  export type LeadStatusEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadStatusEvent to fetch.
     */
    where: LeadStatusEventWhereUniqueInput
  }

  /**
   * LeadStatusEvent findFirst
   */
  export type LeadStatusEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadStatusEvent to fetch.
     */
    where?: LeadStatusEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadStatusEvents to fetch.
     */
    orderBy?: LeadStatusEventOrderByWithRelationInput | LeadStatusEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadStatusEvents.
     */
    cursor?: LeadStatusEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadStatusEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadStatusEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadStatusEvents.
     */
    distinct?: LeadStatusEventScalarFieldEnum | LeadStatusEventScalarFieldEnum[]
  }

  /**
   * LeadStatusEvent findFirstOrThrow
   */
  export type LeadStatusEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadStatusEvent to fetch.
     */
    where?: LeadStatusEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadStatusEvents to fetch.
     */
    orderBy?: LeadStatusEventOrderByWithRelationInput | LeadStatusEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeadStatusEvents.
     */
    cursor?: LeadStatusEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadStatusEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadStatusEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadStatusEvents.
     */
    distinct?: LeadStatusEventScalarFieldEnum | LeadStatusEventScalarFieldEnum[]
  }

  /**
   * LeadStatusEvent findMany
   */
  export type LeadStatusEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * Filter, which LeadStatusEvents to fetch.
     */
    where?: LeadStatusEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeadStatusEvents to fetch.
     */
    orderBy?: LeadStatusEventOrderByWithRelationInput | LeadStatusEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeadStatusEvents.
     */
    cursor?: LeadStatusEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeadStatusEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeadStatusEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeadStatusEvents.
     */
    distinct?: LeadStatusEventScalarFieldEnum | LeadStatusEventScalarFieldEnum[]
  }

  /**
   * LeadStatusEvent create
   */
  export type LeadStatusEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * The data needed to create a LeadStatusEvent.
     */
    data: XOR<LeadStatusEventCreateInput, LeadStatusEventUncheckedCreateInput>
  }

  /**
   * LeadStatusEvent createMany
   */
  export type LeadStatusEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeadStatusEvents.
     */
    data: LeadStatusEventCreateManyInput | LeadStatusEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeadStatusEvent createManyAndReturn
   */
  export type LeadStatusEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * The data used to create many LeadStatusEvents.
     */
    data: LeadStatusEventCreateManyInput | LeadStatusEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadStatusEvent update
   */
  export type LeadStatusEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * The data needed to update a LeadStatusEvent.
     */
    data: XOR<LeadStatusEventUpdateInput, LeadStatusEventUncheckedUpdateInput>
    /**
     * Choose, which LeadStatusEvent to update.
     */
    where: LeadStatusEventWhereUniqueInput
  }

  /**
   * LeadStatusEvent updateMany
   */
  export type LeadStatusEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeadStatusEvents.
     */
    data: XOR<LeadStatusEventUpdateManyMutationInput, LeadStatusEventUncheckedUpdateManyInput>
    /**
     * Filter which LeadStatusEvents to update
     */
    where?: LeadStatusEventWhereInput
    /**
     * Limit how many LeadStatusEvents to update.
     */
    limit?: number
  }

  /**
   * LeadStatusEvent updateManyAndReturn
   */
  export type LeadStatusEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * The data used to update LeadStatusEvents.
     */
    data: XOR<LeadStatusEventUpdateManyMutationInput, LeadStatusEventUncheckedUpdateManyInput>
    /**
     * Filter which LeadStatusEvents to update
     */
    where?: LeadStatusEventWhereInput
    /**
     * Limit how many LeadStatusEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeadStatusEvent upsert
   */
  export type LeadStatusEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * The filter to search for the LeadStatusEvent to update in case it exists.
     */
    where: LeadStatusEventWhereUniqueInput
    /**
     * In case the LeadStatusEvent found by the `where` argument doesn't exist, create a new LeadStatusEvent with this data.
     */
    create: XOR<LeadStatusEventCreateInput, LeadStatusEventUncheckedCreateInput>
    /**
     * In case the LeadStatusEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeadStatusEventUpdateInput, LeadStatusEventUncheckedUpdateInput>
  }

  /**
   * LeadStatusEvent delete
   */
  export type LeadStatusEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
    /**
     * Filter which LeadStatusEvent to delete.
     */
    where: LeadStatusEventWhereUniqueInput
  }

  /**
   * LeadStatusEvent deleteMany
   */
  export type LeadStatusEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeadStatusEvents to delete
     */
    where?: LeadStatusEventWhereInput
    /**
     * Limit how many LeadStatusEvents to delete.
     */
    limit?: number
  }

  /**
   * LeadStatusEvent without action
   */
  export type LeadStatusEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeadStatusEvent
     */
    select?: LeadStatusEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeadStatusEvent
     */
    omit?: LeadStatusEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadStatusEventInclude<ExtArgs> | null
  }


  /**
   * Model BlogPost
   */

  export type AggregateBlogPost = {
    _count: BlogPostCountAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  export type BlogPostMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    excerpt: string | null
    coverImage: string | null
    content: string | null
    author: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogPostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    excerpt: string | null
    coverImage: string | null
    content: string | null
    author: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogPostCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    excerpt: number
    coverImage: number
    content: number
    author: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BlogPostMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    coverImage?: true
    content?: true
    author?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogPostMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    coverImage?: true
    content?: true
    author?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogPostCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    coverImage?: true
    content?: true
    author?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BlogPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPost to aggregate.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogPosts
    **/
    _count?: true | BlogPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogPostMaxAggregateInputType
  }

  export type GetBlogPostAggregateType<T extends BlogPostAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogPost[P]>
      : GetScalarType<T[P], AggregateBlogPost[P]>
  }




  export type BlogPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithAggregationInput | BlogPostOrderByWithAggregationInput[]
    by: BlogPostScalarFieldEnum[] | BlogPostScalarFieldEnum
    having?: BlogPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogPostCountAggregateInputType | true
    _min?: BlogPostMinAggregateInputType
    _max?: BlogPostMaxAggregateInputType
  }

  export type BlogPostGroupByOutputType = {
    id: string
    title: string
    slug: string
    excerpt: string | null
    coverImage: string | null
    content: string
    author: string
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: BlogPostCountAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  type GetBlogPostGroupByPayload<T extends BlogPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
            : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
        }
      >
    >


  export type BlogPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    coverImage?: boolean
    content?: boolean
    author?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    coverImage?: boolean
    content?: boolean
    author?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    coverImage?: boolean
    content?: boolean
    author?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    coverImage?: boolean
    content?: boolean
    author?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BlogPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "excerpt" | "coverImage" | "content" | "author" | "published" | "createdAt" | "updatedAt", ExtArgs["result"]["blogPost"]>

  export type $BlogPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogPost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      excerpt: string | null
      coverImage: string | null
      content: string
      author: string
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["blogPost"]>
    composites: {}
  }

  type BlogPostGetPayload<S extends boolean | null | undefined | BlogPostDefaultArgs> = $Result.GetResult<Prisma.$BlogPostPayload, S>

  type BlogPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogPostCountAggregateInputType | true
    }

  export interface BlogPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogPost'], meta: { name: 'BlogPost' } }
    /**
     * Find zero or one BlogPost that matches the filter.
     * @param {BlogPostFindUniqueArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogPostFindUniqueArgs>(args: SelectSubset<T, BlogPostFindUniqueArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogPostFindUniqueOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogPostFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogPostFindFirstArgs>(args?: SelectSubset<T, BlogPostFindFirstArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogPostFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogPosts
     * const blogPosts = await prisma.blogPost.findMany()
     * 
     * // Get first 10 BlogPosts
     * const blogPosts = await prisma.blogPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogPostFindManyArgs>(args?: SelectSubset<T, BlogPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogPost.
     * @param {BlogPostCreateArgs} args - Arguments to create a BlogPost.
     * @example
     * // Create one BlogPost
     * const BlogPost = await prisma.blogPost.create({
     *   data: {
     *     // ... data to create a BlogPost
     *   }
     * })
     * 
     */
    create<T extends BlogPostCreateArgs>(args: SelectSubset<T, BlogPostCreateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogPosts.
     * @param {BlogPostCreateManyArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogPostCreateManyArgs>(args?: SelectSubset<T, BlogPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlogPosts and returns the data saved in the database.
     * @param {BlogPostCreateManyAndReturnArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlogPosts and only return the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogPostCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlogPost.
     * @param {BlogPostDeleteArgs} args - Arguments to delete one BlogPost.
     * @example
     * // Delete one BlogPost
     * const BlogPost = await prisma.blogPost.delete({
     *   where: {
     *     // ... filter to delete one BlogPost
     *   }
     * })
     * 
     */
    delete<T extends BlogPostDeleteArgs>(args: SelectSubset<T, BlogPostDeleteArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogPost.
     * @param {BlogPostUpdateArgs} args - Arguments to update one BlogPost.
     * @example
     * // Update one BlogPost
     * const blogPost = await prisma.blogPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogPostUpdateArgs>(args: SelectSubset<T, BlogPostUpdateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogPosts.
     * @param {BlogPostDeleteManyArgs} args - Arguments to filter BlogPosts to delete.
     * @example
     * // Delete a few BlogPosts
     * const { count } = await prisma.blogPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogPostDeleteManyArgs>(args?: SelectSubset<T, BlogPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogPostUpdateManyArgs>(args: SelectSubset<T, BlogPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts and returns the data updated in the database.
     * @param {BlogPostUpdateManyAndReturnArgs} args - Arguments to update many BlogPosts.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlogPosts and only return the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlogPostUpdateManyAndReturnArgs>(args: SelectSubset<T, BlogPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlogPost.
     * @param {BlogPostUpsertArgs} args - Arguments to update or create a BlogPost.
     * @example
     * // Update or create a BlogPost
     * const blogPost = await prisma.blogPost.upsert({
     *   create: {
     *     // ... data to create a BlogPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogPost we want to update
     *   }
     * })
     */
    upsert<T extends BlogPostUpsertArgs>(args: SelectSubset<T, BlogPostUpsertArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostCountArgs} args - Arguments to filter BlogPosts to count.
     * @example
     * // Count the number of BlogPosts
     * const count = await prisma.blogPost.count({
     *   where: {
     *     // ... the filter for the BlogPosts we want to count
     *   }
     * })
    **/
    count<T extends BlogPostCountArgs>(
      args?: Subset<T, BlogPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogPostAggregateArgs>(args: Subset<T, BlogPostAggregateArgs>): Prisma.PrismaPromise<GetBlogPostAggregateType<T>>

    /**
     * Group by BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogPostGroupByArgs['orderBy'] }
        : { orderBy?: BlogPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogPost model
   */
  readonly fields: BlogPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlogPost model
   */
  interface BlogPostFieldRefs {
    readonly id: FieldRef<"BlogPost", 'String'>
    readonly title: FieldRef<"BlogPost", 'String'>
    readonly slug: FieldRef<"BlogPost", 'String'>
    readonly excerpt: FieldRef<"BlogPost", 'String'>
    readonly coverImage: FieldRef<"BlogPost", 'String'>
    readonly content: FieldRef<"BlogPost", 'String'>
    readonly author: FieldRef<"BlogPost", 'String'>
    readonly published: FieldRef<"BlogPost", 'Boolean'>
    readonly createdAt: FieldRef<"BlogPost", 'DateTime'>
    readonly updatedAt: FieldRef<"BlogPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlogPost findUnique
   */
  export type BlogPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findUniqueOrThrow
   */
  export type BlogPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findFirst
   */
  export type BlogPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findFirstOrThrow
   */
  export type BlogPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findMany
   */
  export type BlogPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter, which BlogPosts to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost create
   */
  export type BlogPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The data needed to create a BlogPost.
     */
    data: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
  }

  /**
   * BlogPost createMany
   */
  export type BlogPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost createManyAndReturn
   */
  export type BlogPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost update
   */
  export type BlogPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The data needed to update a BlogPost.
     */
    data: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
    /**
     * Choose, which BlogPost to update.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost updateMany
   */
  export type BlogPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to update.
     */
    limit?: number
  }

  /**
   * BlogPost updateManyAndReturn
   */
  export type BlogPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to update.
     */
    limit?: number
  }

  /**
   * BlogPost upsert
   */
  export type BlogPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * The filter to search for the BlogPost to update in case it exists.
     */
    where: BlogPostWhereUniqueInput
    /**
     * In case the BlogPost found by the `where` argument doesn't exist, create a new BlogPost with this data.
     */
    create: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
    /**
     * In case the BlogPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
  }

  /**
   * BlogPost delete
   */
  export type BlogPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Filter which BlogPost to delete.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost deleteMany
   */
  export type BlogPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPosts to delete
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to delete.
     */
    limit?: number
  }

  /**
   * BlogPost without action
   */
  export type BlogPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
  }


  /**
   * Model TrackingEvent
   */

  export type AggregateTrackingEvent = {
    _count: TrackingEventCountAggregateOutputType | null
    _min: TrackingEventMinAggregateOutputType | null
    _max: TrackingEventMaxAggregateOutputType | null
  }

  export type TrackingEventMinAggregateOutputType = {
    id: string | null
    eventName: string | null
    pageUrl: string | null
    pagePath: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    device: string | null
    sessionId: string | null
    createdAt: Date | null
  }

  export type TrackingEventMaxAggregateOutputType = {
    id: string | null
    eventName: string | null
    pageUrl: string | null
    pagePath: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    device: string | null
    sessionId: string | null
    createdAt: Date | null
  }

  export type TrackingEventCountAggregateOutputType = {
    id: number
    eventName: number
    pageUrl: number
    pagePath: number
    utmSource: number
    utmMedium: number
    utmCampaign: number
    device: number
    sessionId: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type TrackingEventMinAggregateInputType = {
    id?: true
    eventName?: true
    pageUrl?: true
    pagePath?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    device?: true
    sessionId?: true
    createdAt?: true
  }

  export type TrackingEventMaxAggregateInputType = {
    id?: true
    eventName?: true
    pageUrl?: true
    pagePath?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    device?: true
    sessionId?: true
    createdAt?: true
  }

  export type TrackingEventCountAggregateInputType = {
    id?: true
    eventName?: true
    pageUrl?: true
    pagePath?: true
    utmSource?: true
    utmMedium?: true
    utmCampaign?: true
    device?: true
    sessionId?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type TrackingEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingEvent to aggregate.
     */
    where?: TrackingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingEvents to fetch.
     */
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TrackingEvents
    **/
    _count?: true | TrackingEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackingEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackingEventMaxAggregateInputType
  }

  export type GetTrackingEventAggregateType<T extends TrackingEventAggregateArgs> = {
        [P in keyof T & keyof AggregateTrackingEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrackingEvent[P]>
      : GetScalarType<T[P], AggregateTrackingEvent[P]>
  }




  export type TrackingEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackingEventWhereInput
    orderBy?: TrackingEventOrderByWithAggregationInput | TrackingEventOrderByWithAggregationInput[]
    by: TrackingEventScalarFieldEnum[] | TrackingEventScalarFieldEnum
    having?: TrackingEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackingEventCountAggregateInputType | true
    _min?: TrackingEventMinAggregateInputType
    _max?: TrackingEventMaxAggregateInputType
  }

  export type TrackingEventGroupByOutputType = {
    id: string
    eventName: string
    pageUrl: string | null
    pagePath: string | null
    utmSource: string | null
    utmMedium: string | null
    utmCampaign: string | null
    device: string | null
    sessionId: string | null
    metadata: JsonValue | null
    createdAt: Date
    _count: TrackingEventCountAggregateOutputType | null
    _min: TrackingEventMinAggregateOutputType | null
    _max: TrackingEventMaxAggregateOutputType | null
  }

  type GetTrackingEventGroupByPayload<T extends TrackingEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackingEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackingEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackingEventGroupByOutputType[P]>
            : GetScalarType<T[P], TrackingEventGroupByOutputType[P]>
        }
      >
    >


  export type TrackingEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventName?: boolean
    pageUrl?: boolean
    pagePath?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    device?: boolean
    sessionId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["trackingEvent"]>

  export type TrackingEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventName?: boolean
    pageUrl?: boolean
    pagePath?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    device?: boolean
    sessionId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["trackingEvent"]>

  export type TrackingEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventName?: boolean
    pageUrl?: boolean
    pagePath?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    device?: boolean
    sessionId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["trackingEvent"]>

  export type TrackingEventSelectScalar = {
    id?: boolean
    eventName?: boolean
    pageUrl?: boolean
    pagePath?: boolean
    utmSource?: boolean
    utmMedium?: boolean
    utmCampaign?: boolean
    device?: boolean
    sessionId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type TrackingEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventName" | "pageUrl" | "pagePath" | "utmSource" | "utmMedium" | "utmCampaign" | "device" | "sessionId" | "metadata" | "createdAt", ExtArgs["result"]["trackingEvent"]>

  export type $TrackingEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TrackingEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventName: string
      pageUrl: string | null
      pagePath: string | null
      utmSource: string | null
      utmMedium: string | null
      utmCampaign: string | null
      device: string | null
      sessionId: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["trackingEvent"]>
    composites: {}
  }

  type TrackingEventGetPayload<S extends boolean | null | undefined | TrackingEventDefaultArgs> = $Result.GetResult<Prisma.$TrackingEventPayload, S>

  type TrackingEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackingEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TrackingEventCountAggregateInputType | true
    }

  export interface TrackingEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TrackingEvent'], meta: { name: 'TrackingEvent' } }
    /**
     * Find zero or one TrackingEvent that matches the filter.
     * @param {TrackingEventFindUniqueArgs} args - Arguments to find a TrackingEvent
     * @example
     * // Get one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackingEventFindUniqueArgs>(args: SelectSubset<T, TrackingEventFindUniqueArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TrackingEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackingEventFindUniqueOrThrowArgs} args - Arguments to find a TrackingEvent
     * @example
     * // Get one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackingEventFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackingEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackingEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventFindFirstArgs} args - Arguments to find a TrackingEvent
     * @example
     * // Get one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackingEventFindFirstArgs>(args?: SelectSubset<T, TrackingEventFindFirstArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TrackingEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventFindFirstOrThrowArgs} args - Arguments to find a TrackingEvent
     * @example
     * // Get one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackingEventFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackingEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TrackingEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrackingEvents
     * const trackingEvents = await prisma.trackingEvent.findMany()
     * 
     * // Get first 10 TrackingEvents
     * const trackingEvents = await prisma.trackingEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const trackingEventWithIdOnly = await prisma.trackingEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TrackingEventFindManyArgs>(args?: SelectSubset<T, TrackingEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TrackingEvent.
     * @param {TrackingEventCreateArgs} args - Arguments to create a TrackingEvent.
     * @example
     * // Create one TrackingEvent
     * const TrackingEvent = await prisma.trackingEvent.create({
     *   data: {
     *     // ... data to create a TrackingEvent
     *   }
     * })
     * 
     */
    create<T extends TrackingEventCreateArgs>(args: SelectSubset<T, TrackingEventCreateArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TrackingEvents.
     * @param {TrackingEventCreateManyArgs} args - Arguments to create many TrackingEvents.
     * @example
     * // Create many TrackingEvents
     * const trackingEvent = await prisma.trackingEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackingEventCreateManyArgs>(args?: SelectSubset<T, TrackingEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TrackingEvents and returns the data saved in the database.
     * @param {TrackingEventCreateManyAndReturnArgs} args - Arguments to create many TrackingEvents.
     * @example
     * // Create many TrackingEvents
     * const trackingEvent = await prisma.trackingEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TrackingEvents and only return the `id`
     * const trackingEventWithIdOnly = await prisma.trackingEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrackingEventCreateManyAndReturnArgs>(args?: SelectSubset<T, TrackingEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TrackingEvent.
     * @param {TrackingEventDeleteArgs} args - Arguments to delete one TrackingEvent.
     * @example
     * // Delete one TrackingEvent
     * const TrackingEvent = await prisma.trackingEvent.delete({
     *   where: {
     *     // ... filter to delete one TrackingEvent
     *   }
     * })
     * 
     */
    delete<T extends TrackingEventDeleteArgs>(args: SelectSubset<T, TrackingEventDeleteArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TrackingEvent.
     * @param {TrackingEventUpdateArgs} args - Arguments to update one TrackingEvent.
     * @example
     * // Update one TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackingEventUpdateArgs>(args: SelectSubset<T, TrackingEventUpdateArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TrackingEvents.
     * @param {TrackingEventDeleteManyArgs} args - Arguments to filter TrackingEvents to delete.
     * @example
     * // Delete a few TrackingEvents
     * const { count } = await prisma.trackingEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackingEventDeleteManyArgs>(args?: SelectSubset<T, TrackingEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrackingEvents
     * const trackingEvent = await prisma.trackingEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackingEventUpdateManyArgs>(args: SelectSubset<T, TrackingEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TrackingEvents and returns the data updated in the database.
     * @param {TrackingEventUpdateManyAndReturnArgs} args - Arguments to update many TrackingEvents.
     * @example
     * // Update many TrackingEvents
     * const trackingEvent = await prisma.trackingEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TrackingEvents and only return the `id`
     * const trackingEventWithIdOnly = await prisma.trackingEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrackingEventUpdateManyAndReturnArgs>(args: SelectSubset<T, TrackingEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TrackingEvent.
     * @param {TrackingEventUpsertArgs} args - Arguments to update or create a TrackingEvent.
     * @example
     * // Update or create a TrackingEvent
     * const trackingEvent = await prisma.trackingEvent.upsert({
     *   create: {
     *     // ... data to create a TrackingEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrackingEvent we want to update
     *   }
     * })
     */
    upsert<T extends TrackingEventUpsertArgs>(args: SelectSubset<T, TrackingEventUpsertArgs<ExtArgs>>): Prisma__TrackingEventClient<$Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TrackingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventCountArgs} args - Arguments to filter TrackingEvents to count.
     * @example
     * // Count the number of TrackingEvents
     * const count = await prisma.trackingEvent.count({
     *   where: {
     *     // ... the filter for the TrackingEvents we want to count
     *   }
     * })
    **/
    count<T extends TrackingEventCountArgs>(
      args?: Subset<T, TrackingEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackingEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TrackingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrackingEventAggregateArgs>(args: Subset<T, TrackingEventAggregateArgs>): Prisma.PrismaPromise<GetTrackingEventAggregateType<T>>

    /**
     * Group by TrackingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackingEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrackingEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackingEventGroupByArgs['orderBy'] }
        : { orderBy?: TrackingEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrackingEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TrackingEvent model
   */
  readonly fields: TrackingEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TrackingEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackingEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TrackingEvent model
   */
  interface TrackingEventFieldRefs {
    readonly id: FieldRef<"TrackingEvent", 'String'>
    readonly eventName: FieldRef<"TrackingEvent", 'String'>
    readonly pageUrl: FieldRef<"TrackingEvent", 'String'>
    readonly pagePath: FieldRef<"TrackingEvent", 'String'>
    readonly utmSource: FieldRef<"TrackingEvent", 'String'>
    readonly utmMedium: FieldRef<"TrackingEvent", 'String'>
    readonly utmCampaign: FieldRef<"TrackingEvent", 'String'>
    readonly device: FieldRef<"TrackingEvent", 'String'>
    readonly sessionId: FieldRef<"TrackingEvent", 'String'>
    readonly metadata: FieldRef<"TrackingEvent", 'Json'>
    readonly createdAt: FieldRef<"TrackingEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TrackingEvent findUnique
   */
  export type TrackingEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Filter, which TrackingEvent to fetch.
     */
    where: TrackingEventWhereUniqueInput
  }

  /**
   * TrackingEvent findUniqueOrThrow
   */
  export type TrackingEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Filter, which TrackingEvent to fetch.
     */
    where: TrackingEventWhereUniqueInput
  }

  /**
   * TrackingEvent findFirst
   */
  export type TrackingEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Filter, which TrackingEvent to fetch.
     */
    where?: TrackingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingEvents to fetch.
     */
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingEvents.
     */
    cursor?: TrackingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingEvents.
     */
    distinct?: TrackingEventScalarFieldEnum | TrackingEventScalarFieldEnum[]
  }

  /**
   * TrackingEvent findFirstOrThrow
   */
  export type TrackingEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Filter, which TrackingEvent to fetch.
     */
    where?: TrackingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingEvents to fetch.
     */
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TrackingEvents.
     */
    cursor?: TrackingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingEvents.
     */
    distinct?: TrackingEventScalarFieldEnum | TrackingEventScalarFieldEnum[]
  }

  /**
   * TrackingEvent findMany
   */
  export type TrackingEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Filter, which TrackingEvents to fetch.
     */
    where?: TrackingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TrackingEvents to fetch.
     */
    orderBy?: TrackingEventOrderByWithRelationInput | TrackingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TrackingEvents.
     */
    cursor?: TrackingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TrackingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TrackingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TrackingEvents.
     */
    distinct?: TrackingEventScalarFieldEnum | TrackingEventScalarFieldEnum[]
  }

  /**
   * TrackingEvent create
   */
  export type TrackingEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * The data needed to create a TrackingEvent.
     */
    data: XOR<TrackingEventCreateInput, TrackingEventUncheckedCreateInput>
  }

  /**
   * TrackingEvent createMany
   */
  export type TrackingEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrackingEvents.
     */
    data: TrackingEventCreateManyInput | TrackingEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrackingEvent createManyAndReturn
   */
  export type TrackingEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * The data used to create many TrackingEvents.
     */
    data: TrackingEventCreateManyInput | TrackingEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TrackingEvent update
   */
  export type TrackingEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * The data needed to update a TrackingEvent.
     */
    data: XOR<TrackingEventUpdateInput, TrackingEventUncheckedUpdateInput>
    /**
     * Choose, which TrackingEvent to update.
     */
    where: TrackingEventWhereUniqueInput
  }

  /**
   * TrackingEvent updateMany
   */
  export type TrackingEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TrackingEvents.
     */
    data: XOR<TrackingEventUpdateManyMutationInput, TrackingEventUncheckedUpdateManyInput>
    /**
     * Filter which TrackingEvents to update
     */
    where?: TrackingEventWhereInput
    /**
     * Limit how many TrackingEvents to update.
     */
    limit?: number
  }

  /**
   * TrackingEvent updateManyAndReturn
   */
  export type TrackingEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * The data used to update TrackingEvents.
     */
    data: XOR<TrackingEventUpdateManyMutationInput, TrackingEventUncheckedUpdateManyInput>
    /**
     * Filter which TrackingEvents to update
     */
    where?: TrackingEventWhereInput
    /**
     * Limit how many TrackingEvents to update.
     */
    limit?: number
  }

  /**
   * TrackingEvent upsert
   */
  export type TrackingEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * The filter to search for the TrackingEvent to update in case it exists.
     */
    where: TrackingEventWhereUniqueInput
    /**
     * In case the TrackingEvent found by the `where` argument doesn't exist, create a new TrackingEvent with this data.
     */
    create: XOR<TrackingEventCreateInput, TrackingEventUncheckedCreateInput>
    /**
     * In case the TrackingEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackingEventUpdateInput, TrackingEventUncheckedUpdateInput>
  }

  /**
   * TrackingEvent delete
   */
  export type TrackingEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
    /**
     * Filter which TrackingEvent to delete.
     */
    where: TrackingEventWhereUniqueInput
  }

  /**
   * TrackingEvent deleteMany
   */
  export type TrackingEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TrackingEvents to delete
     */
    where?: TrackingEventWhereInput
    /**
     * Limit how many TrackingEvents to delete.
     */
    limit?: number
  }

  /**
   * TrackingEvent without action
   */
  export type TrackingEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrackingEvent
     */
    select?: TrackingEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TrackingEvent
     */
    omit?: TrackingEventOmit<ExtArgs> | null
  }


  /**
   * Model Deal
   */

  export type AggregateDeal = {
    _count: DealCountAggregateOutputType | null
    _avg: DealAvgAggregateOutputType | null
    _sum: DealSumAggregateOutputType | null
    _min: DealMinAggregateOutputType | null
    _max: DealMaxAggregateOutputType | null
  }

  export type DealAvgAggregateOutputType = {
    value: number | null
  }

  export type DealSumAggregateOutputType = {
    value: number | null
  }

  export type DealMinAggregateOutputType = {
    id: string | null
    name: string | null
    value: number | null
    status: string | null
    expectedCloseAt: Date | null
    leadId: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DealMaxAggregateOutputType = {
    id: string | null
    name: string | null
    value: number | null
    status: string | null
    expectedCloseAt: Date | null
    leadId: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DealCountAggregateOutputType = {
    id: number
    name: number
    value: number
    status: number
    expectedCloseAt: number
    leadId: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DealAvgAggregateInputType = {
    value?: true
  }

  export type DealSumAggregateInputType = {
    value?: true
  }

  export type DealMinAggregateInputType = {
    id?: true
    name?: true
    value?: true
    status?: true
    expectedCloseAt?: true
    leadId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DealMaxAggregateInputType = {
    id?: true
    name?: true
    value?: true
    status?: true
    expectedCloseAt?: true
    leadId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DealCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    status?: true
    expectedCloseAt?: true
    leadId?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DealAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deal to aggregate.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Deals
    **/
    _count?: true | DealCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DealAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DealSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DealMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DealMaxAggregateInputType
  }

  export type GetDealAggregateType<T extends DealAggregateArgs> = {
        [P in keyof T & keyof AggregateDeal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeal[P]>
      : GetScalarType<T[P], AggregateDeal[P]>
  }




  export type DealGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DealWhereInput
    orderBy?: DealOrderByWithAggregationInput | DealOrderByWithAggregationInput[]
    by: DealScalarFieldEnum[] | DealScalarFieldEnum
    having?: DealScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DealCountAggregateInputType | true
    _avg?: DealAvgAggregateInputType
    _sum?: DealSumAggregateInputType
    _min?: DealMinAggregateInputType
    _max?: DealMaxAggregateInputType
  }

  export type DealGroupByOutputType = {
    id: string
    name: string
    value: number
    status: string
    expectedCloseAt: Date | null
    leadId: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: DealCountAggregateOutputType | null
    _avg: DealAvgAggregateOutputType | null
    _sum: DealSumAggregateOutputType | null
    _min: DealMinAggregateOutputType | null
    _max: DealMaxAggregateOutputType | null
  }

  type GetDealGroupByPayload<T extends DealGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DealGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DealGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DealGroupByOutputType[P]>
            : GetScalarType<T[P], DealGroupByOutputType[P]>
        }
      >
    >


  export type DealSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    status?: boolean
    expectedCloseAt?: boolean
    leadId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | Deal$leadArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    status?: boolean
    expectedCloseAt?: boolean
    leadId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | Deal$leadArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
    status?: boolean
    expectedCloseAt?: boolean
    leadId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lead?: boolean | Deal$leadArgs<ExtArgs>
  }, ExtArgs["result"]["deal"]>

  export type DealSelectScalar = {
    id?: boolean
    name?: boolean
    value?: boolean
    status?: boolean
    expectedCloseAt?: boolean
    leadId?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DealOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "value" | "status" | "expectedCloseAt" | "leadId" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["deal"]>
  export type DealInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | Deal$leadArgs<ExtArgs>
  }
  export type DealIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | Deal$leadArgs<ExtArgs>
  }
  export type DealIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lead?: boolean | Deal$leadArgs<ExtArgs>
  }

  export type $DealPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Deal"
    objects: {
      lead: Prisma.$LeadPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      value: number
      status: string
      expectedCloseAt: Date | null
      leadId: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deal"]>
    composites: {}
  }

  type DealGetPayload<S extends boolean | null | undefined | DealDefaultArgs> = $Result.GetResult<Prisma.$DealPayload, S>

  type DealCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DealFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DealCountAggregateInputType | true
    }

  export interface DealDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Deal'], meta: { name: 'Deal' } }
    /**
     * Find zero or one Deal that matches the filter.
     * @param {DealFindUniqueArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DealFindUniqueArgs>(args: SelectSubset<T, DealFindUniqueArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Deal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DealFindUniqueOrThrowArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DealFindUniqueOrThrowArgs>(args: SelectSubset<T, DealFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindFirstArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DealFindFirstArgs>(args?: SelectSubset<T, DealFindFirstArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Deal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindFirstOrThrowArgs} args - Arguments to find a Deal
     * @example
     * // Get one Deal
     * const deal = await prisma.deal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DealFindFirstOrThrowArgs>(args?: SelectSubset<T, DealFindFirstOrThrowArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Deals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Deals
     * const deals = await prisma.deal.findMany()
     * 
     * // Get first 10 Deals
     * const deals = await prisma.deal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dealWithIdOnly = await prisma.deal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DealFindManyArgs>(args?: SelectSubset<T, DealFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Deal.
     * @param {DealCreateArgs} args - Arguments to create a Deal.
     * @example
     * // Create one Deal
     * const Deal = await prisma.deal.create({
     *   data: {
     *     // ... data to create a Deal
     *   }
     * })
     * 
     */
    create<T extends DealCreateArgs>(args: SelectSubset<T, DealCreateArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Deals.
     * @param {DealCreateManyArgs} args - Arguments to create many Deals.
     * @example
     * // Create many Deals
     * const deal = await prisma.deal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DealCreateManyArgs>(args?: SelectSubset<T, DealCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Deals and returns the data saved in the database.
     * @param {DealCreateManyAndReturnArgs} args - Arguments to create many Deals.
     * @example
     * // Create many Deals
     * const deal = await prisma.deal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Deals and only return the `id`
     * const dealWithIdOnly = await prisma.deal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DealCreateManyAndReturnArgs>(args?: SelectSubset<T, DealCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Deal.
     * @param {DealDeleteArgs} args - Arguments to delete one Deal.
     * @example
     * // Delete one Deal
     * const Deal = await prisma.deal.delete({
     *   where: {
     *     // ... filter to delete one Deal
     *   }
     * })
     * 
     */
    delete<T extends DealDeleteArgs>(args: SelectSubset<T, DealDeleteArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Deal.
     * @param {DealUpdateArgs} args - Arguments to update one Deal.
     * @example
     * // Update one Deal
     * const deal = await prisma.deal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DealUpdateArgs>(args: SelectSubset<T, DealUpdateArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Deals.
     * @param {DealDeleteManyArgs} args - Arguments to filter Deals to delete.
     * @example
     * // Delete a few Deals
     * const { count } = await prisma.deal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DealDeleteManyArgs>(args?: SelectSubset<T, DealDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Deals
     * const deal = await prisma.deal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DealUpdateManyArgs>(args: SelectSubset<T, DealUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Deals and returns the data updated in the database.
     * @param {DealUpdateManyAndReturnArgs} args - Arguments to update many Deals.
     * @example
     * // Update many Deals
     * const deal = await prisma.deal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Deals and only return the `id`
     * const dealWithIdOnly = await prisma.deal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DealUpdateManyAndReturnArgs>(args: SelectSubset<T, DealUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Deal.
     * @param {DealUpsertArgs} args - Arguments to update or create a Deal.
     * @example
     * // Update or create a Deal
     * const deal = await prisma.deal.upsert({
     *   create: {
     *     // ... data to create a Deal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Deal we want to update
     *   }
     * })
     */
    upsert<T extends DealUpsertArgs>(args: SelectSubset<T, DealUpsertArgs<ExtArgs>>): Prisma__DealClient<$Result.GetResult<Prisma.$DealPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Deals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealCountArgs} args - Arguments to filter Deals to count.
     * @example
     * // Count the number of Deals
     * const count = await prisma.deal.count({
     *   where: {
     *     // ... the filter for the Deals we want to count
     *   }
     * })
    **/
    count<T extends DealCountArgs>(
      args?: Subset<T, DealCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DealCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Deal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DealAggregateArgs>(args: Subset<T, DealAggregateArgs>): Prisma.PrismaPromise<GetDealAggregateType<T>>

    /**
     * Group by Deal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DealGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DealGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DealGroupByArgs['orderBy'] }
        : { orderBy?: DealGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DealGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDealGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Deal model
   */
  readonly fields: DealFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Deal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DealClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lead<T extends Deal$leadArgs<ExtArgs> = {}>(args?: Subset<T, Deal$leadArgs<ExtArgs>>): Prisma__LeadClient<$Result.GetResult<Prisma.$LeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Deal model
   */
  interface DealFieldRefs {
    readonly id: FieldRef<"Deal", 'String'>
    readonly name: FieldRef<"Deal", 'String'>
    readonly value: FieldRef<"Deal", 'Float'>
    readonly status: FieldRef<"Deal", 'String'>
    readonly expectedCloseAt: FieldRef<"Deal", 'DateTime'>
    readonly leadId: FieldRef<"Deal", 'String'>
    readonly notes: FieldRef<"Deal", 'String'>
    readonly createdAt: FieldRef<"Deal", 'DateTime'>
    readonly updatedAt: FieldRef<"Deal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Deal findUnique
   */
  export type DealFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal findUniqueOrThrow
   */
  export type DealFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal findFirst
   */
  export type DealFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal findFirstOrThrow
   */
  export type DealFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deal to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal findMany
   */
  export type DealFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter, which Deals to fetch.
     */
    where?: DealWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Deals to fetch.
     */
    orderBy?: DealOrderByWithRelationInput | DealOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Deals.
     */
    cursor?: DealWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Deals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Deals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Deals.
     */
    distinct?: DealScalarFieldEnum | DealScalarFieldEnum[]
  }

  /**
   * Deal create
   */
  export type DealCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The data needed to create a Deal.
     */
    data: XOR<DealCreateInput, DealUncheckedCreateInput>
  }

  /**
   * Deal createMany
   */
  export type DealCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Deals.
     */
    data: DealCreateManyInput | DealCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Deal createManyAndReturn
   */
  export type DealCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * The data used to create many Deals.
     */
    data: DealCreateManyInput | DealCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deal update
   */
  export type DealUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The data needed to update a Deal.
     */
    data: XOR<DealUpdateInput, DealUncheckedUpdateInput>
    /**
     * Choose, which Deal to update.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal updateMany
   */
  export type DealUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Deals.
     */
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to update.
     */
    limit?: number
  }

  /**
   * Deal updateManyAndReturn
   */
  export type DealUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * The data used to update Deals.
     */
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyInput>
    /**
     * Filter which Deals to update
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Deal upsert
   */
  export type DealUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * The filter to search for the Deal to update in case it exists.
     */
    where: DealWhereUniqueInput
    /**
     * In case the Deal found by the `where` argument doesn't exist, create a new Deal with this data.
     */
    create: XOR<DealCreateInput, DealUncheckedCreateInput>
    /**
     * In case the Deal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DealUpdateInput, DealUncheckedUpdateInput>
  }

  /**
   * Deal delete
   */
  export type DealDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
    /**
     * Filter which Deal to delete.
     */
    where: DealWhereUniqueInput
  }

  /**
   * Deal deleteMany
   */
  export type DealDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Deals to delete
     */
    where?: DealWhereInput
    /**
     * Limit how many Deals to delete.
     */
    limit?: number
  }

  /**
   * Deal.lead
   */
  export type Deal$leadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lead
     */
    select?: LeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lead
     */
    omit?: LeadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeadInclude<ExtArgs> | null
    where?: LeadWhereInput
  }

  /**
   * Deal without action
   */
  export type DealDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Deal
     */
    select?: DealSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Deal
     */
    omit?: DealOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DealInclude<ExtArgs> | null
  }


  /**
   * Model AlertRule
   */

  export type AggregateAlertRule = {
    _count: AlertRuleCountAggregateOutputType | null
    _avg: AlertRuleAvgAggregateOutputType | null
    _sum: AlertRuleSumAggregateOutputType | null
    _min: AlertRuleMinAggregateOutputType | null
    _max: AlertRuleMaxAggregateOutputType | null
  }

  export type AlertRuleAvgAggregateOutputType = {
    cooldownMinutes: number | null
  }

  export type AlertRuleSumAggregateOutputType = {
    cooldownMinutes: number | null
  }

  export type AlertRuleMinAggregateOutputType = {
    id: string | null
    type: string | null
    enabled: boolean | null
    cooldownMinutes: number | null
    lastTriggeredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AlertRuleMaxAggregateOutputType = {
    id: string | null
    type: string | null
    enabled: boolean | null
    cooldownMinutes: number | null
    lastTriggeredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AlertRuleCountAggregateOutputType = {
    id: number
    type: number
    threshold: number
    enabled: number
    cooldownMinutes: number
    lastTriggeredAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AlertRuleAvgAggregateInputType = {
    cooldownMinutes?: true
  }

  export type AlertRuleSumAggregateInputType = {
    cooldownMinutes?: true
  }

  export type AlertRuleMinAggregateInputType = {
    id?: true
    type?: true
    enabled?: true
    cooldownMinutes?: true
    lastTriggeredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AlertRuleMaxAggregateInputType = {
    id?: true
    type?: true
    enabled?: true
    cooldownMinutes?: true
    lastTriggeredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AlertRuleCountAggregateInputType = {
    id?: true
    type?: true
    threshold?: true
    enabled?: true
    cooldownMinutes?: true
    lastTriggeredAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AlertRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertRule to aggregate.
     */
    where?: AlertRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRules to fetch.
     */
    orderBy?: AlertRuleOrderByWithRelationInput | AlertRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlertRules
    **/
    _count?: true | AlertRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertRuleMaxAggregateInputType
  }

  export type GetAlertRuleAggregateType<T extends AlertRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateAlertRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlertRule[P]>
      : GetScalarType<T[P], AggregateAlertRule[P]>
  }




  export type AlertRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertRuleWhereInput
    orderBy?: AlertRuleOrderByWithAggregationInput | AlertRuleOrderByWithAggregationInput[]
    by: AlertRuleScalarFieldEnum[] | AlertRuleScalarFieldEnum
    having?: AlertRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertRuleCountAggregateInputType | true
    _avg?: AlertRuleAvgAggregateInputType
    _sum?: AlertRuleSumAggregateInputType
    _min?: AlertRuleMinAggregateInputType
    _max?: AlertRuleMaxAggregateInputType
  }

  export type AlertRuleGroupByOutputType = {
    id: string
    type: string
    threshold: JsonValue | null
    enabled: boolean
    cooldownMinutes: number
    lastTriggeredAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AlertRuleCountAggregateOutputType | null
    _avg: AlertRuleAvgAggregateOutputType | null
    _sum: AlertRuleSumAggregateOutputType | null
    _min: AlertRuleMinAggregateOutputType | null
    _max: AlertRuleMaxAggregateOutputType | null
  }

  type GetAlertRuleGroupByPayload<T extends AlertRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertRuleGroupByOutputType[P]>
            : GetScalarType<T[P], AlertRuleGroupByOutputType[P]>
        }
      >
    >


  export type AlertRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    threshold?: boolean
    enabled?: boolean
    cooldownMinutes?: boolean
    lastTriggeredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    history?: boolean | AlertRule$historyArgs<ExtArgs>
    _count?: boolean | AlertRuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alertRule"]>

  export type AlertRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    threshold?: boolean
    enabled?: boolean
    cooldownMinutes?: boolean
    lastTriggeredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["alertRule"]>

  export type AlertRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    threshold?: boolean
    enabled?: boolean
    cooldownMinutes?: boolean
    lastTriggeredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["alertRule"]>

  export type AlertRuleSelectScalar = {
    id?: boolean
    type?: boolean
    threshold?: boolean
    enabled?: boolean
    cooldownMinutes?: boolean
    lastTriggeredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AlertRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "threshold" | "enabled" | "cooldownMinutes" | "lastTriggeredAt" | "createdAt" | "updatedAt", ExtArgs["result"]["alertRule"]>
  export type AlertRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    history?: boolean | AlertRule$historyArgs<ExtArgs>
    _count?: boolean | AlertRuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AlertRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AlertRuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AlertRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlertRule"
    objects: {
      history: Prisma.$AlertHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      threshold: Prisma.JsonValue | null
      enabled: boolean
      cooldownMinutes: number
      lastTriggeredAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["alertRule"]>
    composites: {}
  }

  type AlertRuleGetPayload<S extends boolean | null | undefined | AlertRuleDefaultArgs> = $Result.GetResult<Prisma.$AlertRulePayload, S>

  type AlertRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlertRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlertRuleCountAggregateInputType | true
    }

  export interface AlertRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlertRule'], meta: { name: 'AlertRule' } }
    /**
     * Find zero or one AlertRule that matches the filter.
     * @param {AlertRuleFindUniqueArgs} args - Arguments to find a AlertRule
     * @example
     * // Get one AlertRule
     * const alertRule = await prisma.alertRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertRuleFindUniqueArgs>(args: SelectSubset<T, AlertRuleFindUniqueArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AlertRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertRuleFindUniqueOrThrowArgs} args - Arguments to find a AlertRule
     * @example
     * // Get one AlertRule
     * const alertRule = await prisma.alertRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlertRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleFindFirstArgs} args - Arguments to find a AlertRule
     * @example
     * // Get one AlertRule
     * const alertRule = await prisma.alertRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertRuleFindFirstArgs>(args?: SelectSubset<T, AlertRuleFindFirstArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlertRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleFindFirstOrThrowArgs} args - Arguments to find a AlertRule
     * @example
     * // Get one AlertRule
     * const alertRule = await prisma.alertRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AlertRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlertRules
     * const alertRules = await prisma.alertRule.findMany()
     * 
     * // Get first 10 AlertRules
     * const alertRules = await prisma.alertRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertRuleWithIdOnly = await prisma.alertRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertRuleFindManyArgs>(args?: SelectSubset<T, AlertRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AlertRule.
     * @param {AlertRuleCreateArgs} args - Arguments to create a AlertRule.
     * @example
     * // Create one AlertRule
     * const AlertRule = await prisma.alertRule.create({
     *   data: {
     *     // ... data to create a AlertRule
     *   }
     * })
     * 
     */
    create<T extends AlertRuleCreateArgs>(args: SelectSubset<T, AlertRuleCreateArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AlertRules.
     * @param {AlertRuleCreateManyArgs} args - Arguments to create many AlertRules.
     * @example
     * // Create many AlertRules
     * const alertRule = await prisma.alertRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertRuleCreateManyArgs>(args?: SelectSubset<T, AlertRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlertRules and returns the data saved in the database.
     * @param {AlertRuleCreateManyAndReturnArgs} args - Arguments to create many AlertRules.
     * @example
     * // Create many AlertRules
     * const alertRule = await prisma.alertRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlertRules and only return the `id`
     * const alertRuleWithIdOnly = await prisma.alertRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AlertRule.
     * @param {AlertRuleDeleteArgs} args - Arguments to delete one AlertRule.
     * @example
     * // Delete one AlertRule
     * const AlertRule = await prisma.alertRule.delete({
     *   where: {
     *     // ... filter to delete one AlertRule
     *   }
     * })
     * 
     */
    delete<T extends AlertRuleDeleteArgs>(args: SelectSubset<T, AlertRuleDeleteArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AlertRule.
     * @param {AlertRuleUpdateArgs} args - Arguments to update one AlertRule.
     * @example
     * // Update one AlertRule
     * const alertRule = await prisma.alertRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertRuleUpdateArgs>(args: SelectSubset<T, AlertRuleUpdateArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AlertRules.
     * @param {AlertRuleDeleteManyArgs} args - Arguments to filter AlertRules to delete.
     * @example
     * // Delete a few AlertRules
     * const { count } = await prisma.alertRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertRuleDeleteManyArgs>(args?: SelectSubset<T, AlertRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlertRules
     * const alertRule = await prisma.alertRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertRuleUpdateManyArgs>(args: SelectSubset<T, AlertRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertRules and returns the data updated in the database.
     * @param {AlertRuleUpdateManyAndReturnArgs} args - Arguments to update many AlertRules.
     * @example
     * // Update many AlertRules
     * const alertRule = await prisma.alertRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AlertRules and only return the `id`
     * const alertRuleWithIdOnly = await prisma.alertRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlertRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, AlertRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AlertRule.
     * @param {AlertRuleUpsertArgs} args - Arguments to update or create a AlertRule.
     * @example
     * // Update or create a AlertRule
     * const alertRule = await prisma.alertRule.upsert({
     *   create: {
     *     // ... data to create a AlertRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlertRule we want to update
     *   }
     * })
     */
    upsert<T extends AlertRuleUpsertArgs>(args: SelectSubset<T, AlertRuleUpsertArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AlertRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleCountArgs} args - Arguments to filter AlertRules to count.
     * @example
     * // Count the number of AlertRules
     * const count = await prisma.alertRule.count({
     *   where: {
     *     // ... the filter for the AlertRules we want to count
     *   }
     * })
    **/
    count<T extends AlertRuleCountArgs>(
      args?: Subset<T, AlertRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlertRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertRuleAggregateArgs>(args: Subset<T, AlertRuleAggregateArgs>): Prisma.PrismaPromise<GetAlertRuleAggregateType<T>>

    /**
     * Group by AlertRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertRuleGroupByArgs['orderBy'] }
        : { orderBy?: AlertRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlertRule model
   */
  readonly fields: AlertRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlertRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    history<T extends AlertRule$historyArgs<ExtArgs> = {}>(args?: Subset<T, AlertRule$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AlertRule model
   */
  interface AlertRuleFieldRefs {
    readonly id: FieldRef<"AlertRule", 'String'>
    readonly type: FieldRef<"AlertRule", 'String'>
    readonly threshold: FieldRef<"AlertRule", 'Json'>
    readonly enabled: FieldRef<"AlertRule", 'Boolean'>
    readonly cooldownMinutes: FieldRef<"AlertRule", 'Int'>
    readonly lastTriggeredAt: FieldRef<"AlertRule", 'DateTime'>
    readonly createdAt: FieldRef<"AlertRule", 'DateTime'>
    readonly updatedAt: FieldRef<"AlertRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AlertRule findUnique
   */
  export type AlertRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * Filter, which AlertRule to fetch.
     */
    where: AlertRuleWhereUniqueInput
  }

  /**
   * AlertRule findUniqueOrThrow
   */
  export type AlertRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * Filter, which AlertRule to fetch.
     */
    where: AlertRuleWhereUniqueInput
  }

  /**
   * AlertRule findFirst
   */
  export type AlertRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * Filter, which AlertRule to fetch.
     */
    where?: AlertRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRules to fetch.
     */
    orderBy?: AlertRuleOrderByWithRelationInput | AlertRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertRules.
     */
    cursor?: AlertRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertRules.
     */
    distinct?: AlertRuleScalarFieldEnum | AlertRuleScalarFieldEnum[]
  }

  /**
   * AlertRule findFirstOrThrow
   */
  export type AlertRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * Filter, which AlertRule to fetch.
     */
    where?: AlertRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRules to fetch.
     */
    orderBy?: AlertRuleOrderByWithRelationInput | AlertRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertRules.
     */
    cursor?: AlertRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertRules.
     */
    distinct?: AlertRuleScalarFieldEnum | AlertRuleScalarFieldEnum[]
  }

  /**
   * AlertRule findMany
   */
  export type AlertRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * Filter, which AlertRules to fetch.
     */
    where?: AlertRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRules to fetch.
     */
    orderBy?: AlertRuleOrderByWithRelationInput | AlertRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlertRules.
     */
    cursor?: AlertRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertRules.
     */
    distinct?: AlertRuleScalarFieldEnum | AlertRuleScalarFieldEnum[]
  }

  /**
   * AlertRule create
   */
  export type AlertRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a AlertRule.
     */
    data: XOR<AlertRuleCreateInput, AlertRuleUncheckedCreateInput>
  }

  /**
   * AlertRule createMany
   */
  export type AlertRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlertRules.
     */
    data: AlertRuleCreateManyInput | AlertRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertRule createManyAndReturn
   */
  export type AlertRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * The data used to create many AlertRules.
     */
    data: AlertRuleCreateManyInput | AlertRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertRule update
   */
  export type AlertRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a AlertRule.
     */
    data: XOR<AlertRuleUpdateInput, AlertRuleUncheckedUpdateInput>
    /**
     * Choose, which AlertRule to update.
     */
    where: AlertRuleWhereUniqueInput
  }

  /**
   * AlertRule updateMany
   */
  export type AlertRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlertRules.
     */
    data: XOR<AlertRuleUpdateManyMutationInput, AlertRuleUncheckedUpdateManyInput>
    /**
     * Filter which AlertRules to update
     */
    where?: AlertRuleWhereInput
    /**
     * Limit how many AlertRules to update.
     */
    limit?: number
  }

  /**
   * AlertRule updateManyAndReturn
   */
  export type AlertRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * The data used to update AlertRules.
     */
    data: XOR<AlertRuleUpdateManyMutationInput, AlertRuleUncheckedUpdateManyInput>
    /**
     * Filter which AlertRules to update
     */
    where?: AlertRuleWhereInput
    /**
     * Limit how many AlertRules to update.
     */
    limit?: number
  }

  /**
   * AlertRule upsert
   */
  export type AlertRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the AlertRule to update in case it exists.
     */
    where: AlertRuleWhereUniqueInput
    /**
     * In case the AlertRule found by the `where` argument doesn't exist, create a new AlertRule with this data.
     */
    create: XOR<AlertRuleCreateInput, AlertRuleUncheckedCreateInput>
    /**
     * In case the AlertRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertRuleUpdateInput, AlertRuleUncheckedUpdateInput>
  }

  /**
   * AlertRule delete
   */
  export type AlertRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
    /**
     * Filter which AlertRule to delete.
     */
    where: AlertRuleWhereUniqueInput
  }

  /**
   * AlertRule deleteMany
   */
  export type AlertRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertRules to delete
     */
    where?: AlertRuleWhereInput
    /**
     * Limit how many AlertRules to delete.
     */
    limit?: number
  }

  /**
   * AlertRule.history
   */
  export type AlertRule$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    where?: AlertHistoryWhereInput
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    cursor?: AlertHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * AlertRule without action
   */
  export type AlertRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRule
     */
    select?: AlertRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertRule
     */
    omit?: AlertRuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRuleInclude<ExtArgs> | null
  }


  /**
   * Model AlertHistory
   */

  export type AggregateAlertHistory = {
    _count: AlertHistoryCountAggregateOutputType | null
    _min: AlertHistoryMinAggregateOutputType | null
    _max: AlertHistoryMaxAggregateOutputType | null
  }

  export type AlertHistoryMinAggregateOutputType = {
    id: string | null
    ruleId: string | null
    severity: string | null
    message: string | null
    source: string | null
    status: string | null
    createdAt: Date | null
  }

  export type AlertHistoryMaxAggregateOutputType = {
    id: string | null
    ruleId: string | null
    severity: string | null
    message: string | null
    source: string | null
    status: string | null
    createdAt: Date | null
  }

  export type AlertHistoryCountAggregateOutputType = {
    id: number
    ruleId: number
    severity: number
    message: number
    source: number
    status: number
    createdAt: number
    _all: number
  }


  export type AlertHistoryMinAggregateInputType = {
    id?: true
    ruleId?: true
    severity?: true
    message?: true
    source?: true
    status?: true
    createdAt?: true
  }

  export type AlertHistoryMaxAggregateInputType = {
    id?: true
    ruleId?: true
    severity?: true
    message?: true
    source?: true
    status?: true
    createdAt?: true
  }

  export type AlertHistoryCountAggregateInputType = {
    id?: true
    ruleId?: true
    severity?: true
    message?: true
    source?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type AlertHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertHistory to aggregate.
     */
    where?: AlertHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlertHistories
    **/
    _count?: true | AlertHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertHistoryMaxAggregateInputType
  }

  export type GetAlertHistoryAggregateType<T extends AlertHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAlertHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlertHistory[P]>
      : GetScalarType<T[P], AggregateAlertHistory[P]>
  }




  export type AlertHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertHistoryWhereInput
    orderBy?: AlertHistoryOrderByWithAggregationInput | AlertHistoryOrderByWithAggregationInput[]
    by: AlertHistoryScalarFieldEnum[] | AlertHistoryScalarFieldEnum
    having?: AlertHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertHistoryCountAggregateInputType | true
    _min?: AlertHistoryMinAggregateInputType
    _max?: AlertHistoryMaxAggregateInputType
  }

  export type AlertHistoryGroupByOutputType = {
    id: string
    ruleId: string
    severity: string
    message: string
    source: string
    status: string
    createdAt: Date
    _count: AlertHistoryCountAggregateOutputType | null
    _min: AlertHistoryMinAggregateOutputType | null
    _max: AlertHistoryMaxAggregateOutputType | null
  }

  type GetAlertHistoryGroupByPayload<T extends AlertHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], AlertHistoryGroupByOutputType[P]>
        }
      >
    >


  export type AlertHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ruleId?: boolean
    severity?: boolean
    message?: boolean
    source?: boolean
    status?: boolean
    createdAt?: boolean
    rule?: boolean | AlertRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alertHistory"]>

  export type AlertHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ruleId?: boolean
    severity?: boolean
    message?: boolean
    source?: boolean
    status?: boolean
    createdAt?: boolean
    rule?: boolean | AlertRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alertHistory"]>

  export type AlertHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ruleId?: boolean
    severity?: boolean
    message?: boolean
    source?: boolean
    status?: boolean
    createdAt?: boolean
    rule?: boolean | AlertRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alertHistory"]>

  export type AlertHistorySelectScalar = {
    id?: boolean
    ruleId?: boolean
    severity?: boolean
    message?: boolean
    source?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type AlertHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ruleId" | "severity" | "message" | "source" | "status" | "createdAt", ExtArgs["result"]["alertHistory"]>
  export type AlertHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rule?: boolean | AlertRuleDefaultArgs<ExtArgs>
  }
  export type AlertHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rule?: boolean | AlertRuleDefaultArgs<ExtArgs>
  }
  export type AlertHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rule?: boolean | AlertRuleDefaultArgs<ExtArgs>
  }

  export type $AlertHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlertHistory"
    objects: {
      rule: Prisma.$AlertRulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ruleId: string
      severity: string
      message: string
      source: string
      status: string
      createdAt: Date
    }, ExtArgs["result"]["alertHistory"]>
    composites: {}
  }

  type AlertHistoryGetPayload<S extends boolean | null | undefined | AlertHistoryDefaultArgs> = $Result.GetResult<Prisma.$AlertHistoryPayload, S>

  type AlertHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlertHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlertHistoryCountAggregateInputType | true
    }

  export interface AlertHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlertHistory'], meta: { name: 'AlertHistory' } }
    /**
     * Find zero or one AlertHistory that matches the filter.
     * @param {AlertHistoryFindUniqueArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertHistoryFindUniqueArgs>(args: SelectSubset<T, AlertHistoryFindUniqueArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AlertHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlertHistoryFindUniqueOrThrowArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlertHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindFirstArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertHistoryFindFirstArgs>(args?: SelectSubset<T, AlertHistoryFindFirstArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AlertHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindFirstOrThrowArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AlertHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlertHistories
     * const alertHistories = await prisma.alertHistory.findMany()
     * 
     * // Get first 10 AlertHistories
     * const alertHistories = await prisma.alertHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertHistoryWithIdOnly = await prisma.alertHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertHistoryFindManyArgs>(args?: SelectSubset<T, AlertHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AlertHistory.
     * @param {AlertHistoryCreateArgs} args - Arguments to create a AlertHistory.
     * @example
     * // Create one AlertHistory
     * const AlertHistory = await prisma.alertHistory.create({
     *   data: {
     *     // ... data to create a AlertHistory
     *   }
     * })
     * 
     */
    create<T extends AlertHistoryCreateArgs>(args: SelectSubset<T, AlertHistoryCreateArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AlertHistories.
     * @param {AlertHistoryCreateManyArgs} args - Arguments to create many AlertHistories.
     * @example
     * // Create many AlertHistories
     * const alertHistory = await prisma.alertHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertHistoryCreateManyArgs>(args?: SelectSubset<T, AlertHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlertHistories and returns the data saved in the database.
     * @param {AlertHistoryCreateManyAndReturnArgs} args - Arguments to create many AlertHistories.
     * @example
     * // Create many AlertHistories
     * const alertHistory = await prisma.alertHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlertHistories and only return the `id`
     * const alertHistoryWithIdOnly = await prisma.alertHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AlertHistory.
     * @param {AlertHistoryDeleteArgs} args - Arguments to delete one AlertHistory.
     * @example
     * // Delete one AlertHistory
     * const AlertHistory = await prisma.alertHistory.delete({
     *   where: {
     *     // ... filter to delete one AlertHistory
     *   }
     * })
     * 
     */
    delete<T extends AlertHistoryDeleteArgs>(args: SelectSubset<T, AlertHistoryDeleteArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AlertHistory.
     * @param {AlertHistoryUpdateArgs} args - Arguments to update one AlertHistory.
     * @example
     * // Update one AlertHistory
     * const alertHistory = await prisma.alertHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertHistoryUpdateArgs>(args: SelectSubset<T, AlertHistoryUpdateArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AlertHistories.
     * @param {AlertHistoryDeleteManyArgs} args - Arguments to filter AlertHistories to delete.
     * @example
     * // Delete a few AlertHistories
     * const { count } = await prisma.alertHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertHistoryDeleteManyArgs>(args?: SelectSubset<T, AlertHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlertHistories
     * const alertHistory = await prisma.alertHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertHistoryUpdateManyArgs>(args: SelectSubset<T, AlertHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertHistories and returns the data updated in the database.
     * @param {AlertHistoryUpdateManyAndReturnArgs} args - Arguments to update many AlertHistories.
     * @example
     * // Update many AlertHistories
     * const alertHistory = await prisma.alertHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AlertHistories and only return the `id`
     * const alertHistoryWithIdOnly = await prisma.alertHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlertHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, AlertHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AlertHistory.
     * @param {AlertHistoryUpsertArgs} args - Arguments to update or create a AlertHistory.
     * @example
     * // Update or create a AlertHistory
     * const alertHistory = await prisma.alertHistory.upsert({
     *   create: {
     *     // ... data to create a AlertHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlertHistory we want to update
     *   }
     * })
     */
    upsert<T extends AlertHistoryUpsertArgs>(args: SelectSubset<T, AlertHistoryUpsertArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AlertHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryCountArgs} args - Arguments to filter AlertHistories to count.
     * @example
     * // Count the number of AlertHistories
     * const count = await prisma.alertHistory.count({
     *   where: {
     *     // ... the filter for the AlertHistories we want to count
     *   }
     * })
    **/
    count<T extends AlertHistoryCountArgs>(
      args?: Subset<T, AlertHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlertHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertHistoryAggregateArgs>(args: Subset<T, AlertHistoryAggregateArgs>): Prisma.PrismaPromise<GetAlertHistoryAggregateType<T>>

    /**
     * Group by AlertHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertHistoryGroupByArgs['orderBy'] }
        : { orderBy?: AlertHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlertHistory model
   */
  readonly fields: AlertHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlertHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rule<T extends AlertRuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlertRuleDefaultArgs<ExtArgs>>): Prisma__AlertRuleClient<$Result.GetResult<Prisma.$AlertRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AlertHistory model
   */
  interface AlertHistoryFieldRefs {
    readonly id: FieldRef<"AlertHistory", 'String'>
    readonly ruleId: FieldRef<"AlertHistory", 'String'>
    readonly severity: FieldRef<"AlertHistory", 'String'>
    readonly message: FieldRef<"AlertHistory", 'String'>
    readonly source: FieldRef<"AlertHistory", 'String'>
    readonly status: FieldRef<"AlertHistory", 'String'>
    readonly createdAt: FieldRef<"AlertHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AlertHistory findUnique
   */
  export type AlertHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistory to fetch.
     */
    where: AlertHistoryWhereUniqueInput
  }

  /**
   * AlertHistory findUniqueOrThrow
   */
  export type AlertHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistory to fetch.
     */
    where: AlertHistoryWhereUniqueInput
  }

  /**
   * AlertHistory findFirst
   */
  export type AlertHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistory to fetch.
     */
    where?: AlertHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertHistories.
     */
    cursor?: AlertHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertHistories.
     */
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * AlertHistory findFirstOrThrow
   */
  export type AlertHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistory to fetch.
     */
    where?: AlertHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertHistories.
     */
    cursor?: AlertHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertHistories.
     */
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * AlertHistory findMany
   */
  export type AlertHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistories to fetch.
     */
    where?: AlertHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlertHistories.
     */
    cursor?: AlertHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertHistories.
     */
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * AlertHistory create
   */
  export type AlertHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a AlertHistory.
     */
    data: XOR<AlertHistoryCreateInput, AlertHistoryUncheckedCreateInput>
  }

  /**
   * AlertHistory createMany
   */
  export type AlertHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlertHistories.
     */
    data: AlertHistoryCreateManyInput | AlertHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertHistory createManyAndReturn
   */
  export type AlertHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many AlertHistories.
     */
    data: AlertHistoryCreateManyInput | AlertHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AlertHistory update
   */
  export type AlertHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a AlertHistory.
     */
    data: XOR<AlertHistoryUpdateInput, AlertHistoryUncheckedUpdateInput>
    /**
     * Choose, which AlertHistory to update.
     */
    where: AlertHistoryWhereUniqueInput
  }

  /**
   * AlertHistory updateMany
   */
  export type AlertHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlertHistories.
     */
    data: XOR<AlertHistoryUpdateManyMutationInput, AlertHistoryUncheckedUpdateManyInput>
    /**
     * Filter which AlertHistories to update
     */
    where?: AlertHistoryWhereInput
    /**
     * Limit how many AlertHistories to update.
     */
    limit?: number
  }

  /**
   * AlertHistory updateManyAndReturn
   */
  export type AlertHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * The data used to update AlertHistories.
     */
    data: XOR<AlertHistoryUpdateManyMutationInput, AlertHistoryUncheckedUpdateManyInput>
    /**
     * Filter which AlertHistories to update
     */
    where?: AlertHistoryWhereInput
    /**
     * Limit how many AlertHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AlertHistory upsert
   */
  export type AlertHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the AlertHistory to update in case it exists.
     */
    where: AlertHistoryWhereUniqueInput
    /**
     * In case the AlertHistory found by the `where` argument doesn't exist, create a new AlertHistory with this data.
     */
    create: XOR<AlertHistoryCreateInput, AlertHistoryUncheckedCreateInput>
    /**
     * In case the AlertHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertHistoryUpdateInput, AlertHistoryUncheckedUpdateInput>
  }

  /**
   * AlertHistory delete
   */
  export type AlertHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter which AlertHistory to delete.
     */
    where: AlertHistoryWhereUniqueInput
  }

  /**
   * AlertHistory deleteMany
   */
  export type AlertHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertHistories to delete
     */
    where?: AlertHistoryWhereInput
    /**
     * Limit how many AlertHistories to delete.
     */
    limit?: number
  }

  /**
   * AlertHistory without action
   */
  export type AlertHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AlertHistory
     */
    omit?: AlertHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
  }


  /**
   * Model NotificationTarget
   */

  export type AggregateNotificationTarget = {
    _count: NotificationTargetCountAggregateOutputType | null
    _min: NotificationTargetMinAggregateOutputType | null
    _max: NotificationTargetMaxAggregateOutputType | null
  }

  export type NotificationTargetMinAggregateOutputType = {
    id: string | null
    type: string | null
    destination: string | null
    enabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationTargetMaxAggregateOutputType = {
    id: string | null
    type: string | null
    destination: string | null
    enabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationTargetCountAggregateOutputType = {
    id: number
    type: number
    destination: number
    enabled: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationTargetMinAggregateInputType = {
    id?: true
    type?: true
    destination?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationTargetMaxAggregateInputType = {
    id?: true
    type?: true
    destination?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationTargetCountAggregateInputType = {
    id?: true
    type?: true
    destination?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationTargetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationTarget to aggregate.
     */
    where?: NotificationTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTargets to fetch.
     */
    orderBy?: NotificationTargetOrderByWithRelationInput | NotificationTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NotificationTargets
    **/
    _count?: true | NotificationTargetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationTargetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationTargetMaxAggregateInputType
  }

  export type GetNotificationTargetAggregateType<T extends NotificationTargetAggregateArgs> = {
        [P in keyof T & keyof AggregateNotificationTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotificationTarget[P]>
      : GetScalarType<T[P], AggregateNotificationTarget[P]>
  }




  export type NotificationTargetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationTargetWhereInput
    orderBy?: NotificationTargetOrderByWithAggregationInput | NotificationTargetOrderByWithAggregationInput[]
    by: NotificationTargetScalarFieldEnum[] | NotificationTargetScalarFieldEnum
    having?: NotificationTargetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationTargetCountAggregateInputType | true
    _min?: NotificationTargetMinAggregateInputType
    _max?: NotificationTargetMaxAggregateInputType
  }

  export type NotificationTargetGroupByOutputType = {
    id: string
    type: string
    destination: string
    enabled: boolean
    createdAt: Date
    updatedAt: Date
    _count: NotificationTargetCountAggregateOutputType | null
    _min: NotificationTargetMinAggregateOutputType | null
    _max: NotificationTargetMaxAggregateOutputType | null
  }

  type GetNotificationTargetGroupByPayload<T extends NotificationTargetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationTargetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationTargetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationTargetGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationTargetGroupByOutputType[P]>
        }
      >
    >


  export type NotificationTargetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    destination?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationTarget"]>

  export type NotificationTargetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    destination?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationTarget"]>

  export type NotificationTargetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    destination?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notificationTarget"]>

  export type NotificationTargetSelectScalar = {
    id?: boolean
    type?: boolean
    destination?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationTargetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "destination" | "enabled" | "createdAt" | "updatedAt", ExtArgs["result"]["notificationTarget"]>

  export type $NotificationTargetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NotificationTarget"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      destination: string
      enabled: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notificationTarget"]>
    composites: {}
  }

  type NotificationTargetGetPayload<S extends boolean | null | undefined | NotificationTargetDefaultArgs> = $Result.GetResult<Prisma.$NotificationTargetPayload, S>

  type NotificationTargetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationTargetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationTargetCountAggregateInputType | true
    }

  export interface NotificationTargetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NotificationTarget'], meta: { name: 'NotificationTarget' } }
    /**
     * Find zero or one NotificationTarget that matches the filter.
     * @param {NotificationTargetFindUniqueArgs} args - Arguments to find a NotificationTarget
     * @example
     * // Get one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationTargetFindUniqueArgs>(args: SelectSubset<T, NotificationTargetFindUniqueArgs<ExtArgs>>): Prisma__NotificationTargetClient<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NotificationTarget that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationTargetFindUniqueOrThrowArgs} args - Arguments to find a NotificationTarget
     * @example
     * // Get one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationTargetFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationTargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationTargetClient<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationTarget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetFindFirstArgs} args - Arguments to find a NotificationTarget
     * @example
     * // Get one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationTargetFindFirstArgs>(args?: SelectSubset<T, NotificationTargetFindFirstArgs<ExtArgs>>): Prisma__NotificationTargetClient<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NotificationTarget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetFindFirstOrThrowArgs} args - Arguments to find a NotificationTarget
     * @example
     * // Get one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationTargetFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationTargetFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationTargetClient<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NotificationTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotificationTargets
     * const notificationTargets = await prisma.notificationTarget.findMany()
     * 
     * // Get first 10 NotificationTargets
     * const notificationTargets = await prisma.notificationTarget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationTargetWithIdOnly = await prisma.notificationTarget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationTargetFindManyArgs>(args?: SelectSubset<T, NotificationTargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NotificationTarget.
     * @param {NotificationTargetCreateArgs} args - Arguments to create a NotificationTarget.
     * @example
     * // Create one NotificationTarget
     * const NotificationTarget = await prisma.notificationTarget.create({
     *   data: {
     *     // ... data to create a NotificationTarget
     *   }
     * })
     * 
     */
    create<T extends NotificationTargetCreateArgs>(args: SelectSubset<T, NotificationTargetCreateArgs<ExtArgs>>): Prisma__NotificationTargetClient<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NotificationTargets.
     * @param {NotificationTargetCreateManyArgs} args - Arguments to create many NotificationTargets.
     * @example
     * // Create many NotificationTargets
     * const notificationTarget = await prisma.notificationTarget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationTargetCreateManyArgs>(args?: SelectSubset<T, NotificationTargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NotificationTargets and returns the data saved in the database.
     * @param {NotificationTargetCreateManyAndReturnArgs} args - Arguments to create many NotificationTargets.
     * @example
     * // Create many NotificationTargets
     * const notificationTarget = await prisma.notificationTarget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NotificationTargets and only return the `id`
     * const notificationTargetWithIdOnly = await prisma.notificationTarget.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationTargetCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationTargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NotificationTarget.
     * @param {NotificationTargetDeleteArgs} args - Arguments to delete one NotificationTarget.
     * @example
     * // Delete one NotificationTarget
     * const NotificationTarget = await prisma.notificationTarget.delete({
     *   where: {
     *     // ... filter to delete one NotificationTarget
     *   }
     * })
     * 
     */
    delete<T extends NotificationTargetDeleteArgs>(args: SelectSubset<T, NotificationTargetDeleteArgs<ExtArgs>>): Prisma__NotificationTargetClient<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NotificationTarget.
     * @param {NotificationTargetUpdateArgs} args - Arguments to update one NotificationTarget.
     * @example
     * // Update one NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationTargetUpdateArgs>(args: SelectSubset<T, NotificationTargetUpdateArgs<ExtArgs>>): Prisma__NotificationTargetClient<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NotificationTargets.
     * @param {NotificationTargetDeleteManyArgs} args - Arguments to filter NotificationTargets to delete.
     * @example
     * // Delete a few NotificationTargets
     * const { count } = await prisma.notificationTarget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationTargetDeleteManyArgs>(args?: SelectSubset<T, NotificationTargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotificationTargets
     * const notificationTarget = await prisma.notificationTarget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationTargetUpdateManyArgs>(args: SelectSubset<T, NotificationTargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NotificationTargets and returns the data updated in the database.
     * @param {NotificationTargetUpdateManyAndReturnArgs} args - Arguments to update many NotificationTargets.
     * @example
     * // Update many NotificationTargets
     * const notificationTarget = await prisma.notificationTarget.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NotificationTargets and only return the `id`
     * const notificationTargetWithIdOnly = await prisma.notificationTarget.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationTargetUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationTargetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NotificationTarget.
     * @param {NotificationTargetUpsertArgs} args - Arguments to update or create a NotificationTarget.
     * @example
     * // Update or create a NotificationTarget
     * const notificationTarget = await prisma.notificationTarget.upsert({
     *   create: {
     *     // ... data to create a NotificationTarget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotificationTarget we want to update
     *   }
     * })
     */
    upsert<T extends NotificationTargetUpsertArgs>(args: SelectSubset<T, NotificationTargetUpsertArgs<ExtArgs>>): Prisma__NotificationTargetClient<$Result.GetResult<Prisma.$NotificationTargetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NotificationTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetCountArgs} args - Arguments to filter NotificationTargets to count.
     * @example
     * // Count the number of NotificationTargets
     * const count = await prisma.notificationTarget.count({
     *   where: {
     *     // ... the filter for the NotificationTargets we want to count
     *   }
     * })
    **/
    count<T extends NotificationTargetCountArgs>(
      args?: Subset<T, NotificationTargetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationTargetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NotificationTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationTargetAggregateArgs>(args: Subset<T, NotificationTargetAggregateArgs>): Prisma.PrismaPromise<GetNotificationTargetAggregateType<T>>

    /**
     * Group by NotificationTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationTargetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationTargetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationTargetGroupByArgs['orderBy'] }
        : { orderBy?: NotificationTargetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationTargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NotificationTarget model
   */
  readonly fields: NotificationTargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NotificationTarget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationTargetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NotificationTarget model
   */
  interface NotificationTargetFieldRefs {
    readonly id: FieldRef<"NotificationTarget", 'String'>
    readonly type: FieldRef<"NotificationTarget", 'String'>
    readonly destination: FieldRef<"NotificationTarget", 'String'>
    readonly enabled: FieldRef<"NotificationTarget", 'Boolean'>
    readonly createdAt: FieldRef<"NotificationTarget", 'DateTime'>
    readonly updatedAt: FieldRef<"NotificationTarget", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NotificationTarget findUnique
   */
  export type NotificationTargetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTarget to fetch.
     */
    where: NotificationTargetWhereUniqueInput
  }

  /**
   * NotificationTarget findUniqueOrThrow
   */
  export type NotificationTargetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTarget to fetch.
     */
    where: NotificationTargetWhereUniqueInput
  }

  /**
   * NotificationTarget findFirst
   */
  export type NotificationTargetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTarget to fetch.
     */
    where?: NotificationTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTargets to fetch.
     */
    orderBy?: NotificationTargetOrderByWithRelationInput | NotificationTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationTargets.
     */
    cursor?: NotificationTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationTargets.
     */
    distinct?: NotificationTargetScalarFieldEnum | NotificationTargetScalarFieldEnum[]
  }

  /**
   * NotificationTarget findFirstOrThrow
   */
  export type NotificationTargetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTarget to fetch.
     */
    where?: NotificationTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTargets to fetch.
     */
    orderBy?: NotificationTargetOrderByWithRelationInput | NotificationTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NotificationTargets.
     */
    cursor?: NotificationTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationTargets.
     */
    distinct?: NotificationTargetScalarFieldEnum | NotificationTargetScalarFieldEnum[]
  }

  /**
   * NotificationTarget findMany
   */
  export type NotificationTargetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * Filter, which NotificationTargets to fetch.
     */
    where?: NotificationTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NotificationTargets to fetch.
     */
    orderBy?: NotificationTargetOrderByWithRelationInput | NotificationTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NotificationTargets.
     */
    cursor?: NotificationTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NotificationTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NotificationTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NotificationTargets.
     */
    distinct?: NotificationTargetScalarFieldEnum | NotificationTargetScalarFieldEnum[]
  }

  /**
   * NotificationTarget create
   */
  export type NotificationTargetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * The data needed to create a NotificationTarget.
     */
    data: XOR<NotificationTargetCreateInput, NotificationTargetUncheckedCreateInput>
  }

  /**
   * NotificationTarget createMany
   */
  export type NotificationTargetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotificationTargets.
     */
    data: NotificationTargetCreateManyInput | NotificationTargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationTarget createManyAndReturn
   */
  export type NotificationTargetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * The data used to create many NotificationTargets.
     */
    data: NotificationTargetCreateManyInput | NotificationTargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NotificationTarget update
   */
  export type NotificationTargetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * The data needed to update a NotificationTarget.
     */
    data: XOR<NotificationTargetUpdateInput, NotificationTargetUncheckedUpdateInput>
    /**
     * Choose, which NotificationTarget to update.
     */
    where: NotificationTargetWhereUniqueInput
  }

  /**
   * NotificationTarget updateMany
   */
  export type NotificationTargetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NotificationTargets.
     */
    data: XOR<NotificationTargetUpdateManyMutationInput, NotificationTargetUncheckedUpdateManyInput>
    /**
     * Filter which NotificationTargets to update
     */
    where?: NotificationTargetWhereInput
    /**
     * Limit how many NotificationTargets to update.
     */
    limit?: number
  }

  /**
   * NotificationTarget updateManyAndReturn
   */
  export type NotificationTargetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * The data used to update NotificationTargets.
     */
    data: XOR<NotificationTargetUpdateManyMutationInput, NotificationTargetUncheckedUpdateManyInput>
    /**
     * Filter which NotificationTargets to update
     */
    where?: NotificationTargetWhereInput
    /**
     * Limit how many NotificationTargets to update.
     */
    limit?: number
  }

  /**
   * NotificationTarget upsert
   */
  export type NotificationTargetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * The filter to search for the NotificationTarget to update in case it exists.
     */
    where: NotificationTargetWhereUniqueInput
    /**
     * In case the NotificationTarget found by the `where` argument doesn't exist, create a new NotificationTarget with this data.
     */
    create: XOR<NotificationTargetCreateInput, NotificationTargetUncheckedCreateInput>
    /**
     * In case the NotificationTarget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationTargetUpdateInput, NotificationTargetUncheckedUpdateInput>
  }

  /**
   * NotificationTarget delete
   */
  export type NotificationTargetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
    /**
     * Filter which NotificationTarget to delete.
     */
    where: NotificationTargetWhereUniqueInput
  }

  /**
   * NotificationTarget deleteMany
   */
  export type NotificationTargetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NotificationTargets to delete
     */
    where?: NotificationTargetWhereInput
    /**
     * Limit how many NotificationTargets to delete.
     */
    limit?: number
  }

  /**
   * NotificationTarget without action
   */
  export type NotificationTargetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotificationTarget
     */
    select?: NotificationTargetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NotificationTarget
     */
    omit?: NotificationTargetOmit<ExtArgs> | null
  }


  /**
   * Model SystemSetting
   */

  export type AggregateSystemSetting = {
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  export type SystemSettingMinAggregateOutputType = {
    key: string | null
    value: string | null
    isSecret: boolean | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type SystemSettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
    isSecret: boolean | null
    updatedBy: string | null
    updatedAt: Date | null
  }

  export type SystemSettingCountAggregateOutputType = {
    key: number
    value: number
    isSecret: number
    updatedBy: number
    updatedAt: number
    _all: number
  }


  export type SystemSettingMinAggregateInputType = {
    key?: true
    value?: true
    isSecret?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type SystemSettingMaxAggregateInputType = {
    key?: true
    value?: true
    isSecret?: true
    updatedBy?: true
    updatedAt?: true
  }

  export type SystemSettingCountAggregateInputType = {
    key?: true
    value?: true
    isSecret?: true
    updatedBy?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSetting to aggregate.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemSettings
    **/
    _count?: true | SystemSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemSettingMaxAggregateInputType
  }

  export type GetSystemSettingAggregateType<T extends SystemSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSetting[P]>
      : GetScalarType<T[P], AggregateSystemSetting[P]>
  }




  export type SystemSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemSettingWhereInput
    orderBy?: SystemSettingOrderByWithAggregationInput | SystemSettingOrderByWithAggregationInput[]
    by: SystemSettingScalarFieldEnum[] | SystemSettingScalarFieldEnum
    having?: SystemSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemSettingCountAggregateInputType | true
    _min?: SystemSettingMinAggregateInputType
    _max?: SystemSettingMaxAggregateInputType
  }

  export type SystemSettingGroupByOutputType = {
    key: string
    value: string
    isSecret: boolean
    updatedBy: string
    updatedAt: Date
    _count: SystemSettingCountAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  type GetSystemSettingGroupByPayload<T extends SystemSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
        }
      >
    >


  export type SystemSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    isSecret?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    isSecret?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    isSecret?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectScalar = {
    key?: boolean
    value?: boolean
    isSecret?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
  }

  export type SystemSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value" | "isSecret" | "updatedBy" | "updatedAt", ExtArgs["result"]["systemSetting"]>

  export type $SystemSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      isSecret: boolean
      updatedBy: string
      updatedAt: Date
    }, ExtArgs["result"]["systemSetting"]>
    composites: {}
  }

  type SystemSettingGetPayload<S extends boolean | null | undefined | SystemSettingDefaultArgs> = $Result.GetResult<Prisma.$SystemSettingPayload, S>

  type SystemSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemSettingCountAggregateInputType | true
    }

  export interface SystemSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemSetting'], meta: { name: 'SystemSetting' } }
    /**
     * Find zero or one SystemSetting that matches the filter.
     * @param {SystemSettingFindUniqueArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemSettingFindUniqueArgs>(args: SelectSubset<T, SystemSettingFindUniqueArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemSettingFindUniqueOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemSettingFindFirstArgs>(args?: SelectSubset<T, SystemSettingFindFirstArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany()
     * 
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const systemSettingWithKeyOnly = await prisma.systemSetting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends SystemSettingFindManyArgs>(args?: SelectSubset<T, SystemSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemSetting.
     * @param {SystemSettingCreateArgs} args - Arguments to create a SystemSetting.
     * @example
     * // Create one SystemSetting
     * const SystemSetting = await prisma.systemSetting.create({
     *   data: {
     *     // ... data to create a SystemSetting
     *   }
     * })
     * 
     */
    create<T extends SystemSettingCreateArgs>(args: SelectSubset<T, SystemSettingCreateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemSettings.
     * @param {SystemSettingCreateManyArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemSettingCreateManyArgs>(args?: SelectSubset<T, SystemSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemSettings and returns the data saved in the database.
     * @param {SystemSettingCreateManyAndReturnArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemSettings and only return the `key`
     * const systemSettingWithKeyOnly = await prisma.systemSetting.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemSetting.
     * @param {SystemSettingDeleteArgs} args - Arguments to delete one SystemSetting.
     * @example
     * // Delete one SystemSetting
     * const SystemSetting = await prisma.systemSetting.delete({
     *   where: {
     *     // ... filter to delete one SystemSetting
     *   }
     * })
     * 
     */
    delete<T extends SystemSettingDeleteArgs>(args: SelectSubset<T, SystemSettingDeleteArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemSetting.
     * @param {SystemSettingUpdateArgs} args - Arguments to update one SystemSetting.
     * @example
     * // Update one SystemSetting
     * const systemSetting = await prisma.systemSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemSettingUpdateArgs>(args: SelectSubset<T, SystemSettingUpdateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemSettingDeleteManyArgs>(args?: SelectSubset<T, SystemSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemSettingUpdateManyArgs>(args: SelectSubset<T, SystemSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings and returns the data updated in the database.
     * @param {SystemSettingUpdateManyAndReturnArgs} args - Arguments to update many SystemSettings.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemSettings and only return the `key`
     * const systemSettingWithKeyOnly = await prisma.systemSetting.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemSetting.
     * @param {SystemSettingUpsertArgs} args - Arguments to update or create a SystemSetting.
     * @example
     * // Update or create a SystemSetting
     * const systemSetting = await prisma.systemSetting.upsert({
     *   create: {
     *     // ... data to create a SystemSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSetting we want to update
     *   }
     * })
     */
    upsert<T extends SystemSettingUpsertArgs>(args: SelectSubset<T, SystemSettingUpsertArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSetting.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
    **/
    count<T extends SystemSettingCountArgs>(
      args?: Subset<T, SystemSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemSettingAggregateArgs>(args: Subset<T, SystemSettingAggregateArgs>): Prisma.PrismaPromise<GetSystemSettingAggregateType<T>>

    /**
     * Group by SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemSetting model
   */
  readonly fields: SystemSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemSetting model
   */
  interface SystemSettingFieldRefs {
    readonly key: FieldRef<"SystemSetting", 'String'>
    readonly value: FieldRef<"SystemSetting", 'String'>
    readonly isSecret: FieldRef<"SystemSetting", 'Boolean'>
    readonly updatedBy: FieldRef<"SystemSetting", 'String'>
    readonly updatedAt: FieldRef<"SystemSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemSetting findUnique
   */
  export type SystemSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findUniqueOrThrow
   */
  export type SystemSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findFirst
   */
  export type SystemSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findFirstOrThrow
   */
  export type SystemSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findMany
   */
  export type SystemSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting create
   */
  export type SystemSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemSetting.
     */
    data: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
  }

  /**
   * SystemSetting createMany
   */
  export type SystemSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting createManyAndReturn
   */
  export type SystemSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting update
   */
  export type SystemSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemSetting.
     */
    data: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
    /**
     * Choose, which SystemSetting to update.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting updateMany
   */
  export type SystemSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number
  }

  /**
   * SystemSetting updateManyAndReturn
   */
  export type SystemSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number
  }

  /**
   * SystemSetting upsert
   */
  export type SystemSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemSetting to update in case it exists.
     */
    where: SystemSettingWhereUniqueInput
    /**
     * In case the SystemSetting found by the `where` argument doesn't exist, create a new SystemSetting with this data.
     */
    create: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
    /**
     * In case the SystemSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
  }

  /**
   * SystemSetting delete
   */
  export type SystemSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter which SystemSetting to delete.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting deleteMany
   */
  export type SystemSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to delete.
     */
    limit?: number
  }

  /**
   * SystemSetting without action
   */
  export type SystemSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    entity: number
    entityId: number
    oldValue: number
    newValue: number
    userId: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    userId?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    userId?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    entity?: true
    entityId?: true
    oldValue?: true
    newValue?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    entity: string
    entityId: string | null
    oldValue: JsonValue | null
    newValue: JsonValue | null
    userId: string
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    userId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    userId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    userId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "entity" | "entityId" | "oldValue" | "newValue" | "userId" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      entity: string
      entityId: string | null
      oldValue: Prisma.JsonValue | null
      newValue: Prisma.JsonValue | null
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entity: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly oldValue: FieldRef<"AuditLog", 'Json'>
    readonly newValue: FieldRef<"AuditLog", 'Json'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model Integration
   */

  export type AggregateIntegration = {
    _count: IntegrationCountAggregateOutputType | null
    _min: IntegrationMinAggregateOutputType | null
    _max: IntegrationMaxAggregateOutputType | null
  }

  export type IntegrationMinAggregateOutputType = {
    id: string | null
    provider: string | null
    accountId: string | null
    accessToken: string | null
    refreshToken: string | null
    expiryDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IntegrationMaxAggregateOutputType = {
    id: string | null
    provider: string | null
    accountId: string | null
    accessToken: string | null
    refreshToken: string | null
    expiryDate: Date | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IntegrationCountAggregateOutputType = {
    id: number
    provider: number
    accountId: number
    accessToken: number
    refreshToken: number
    expiryDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IntegrationMinAggregateInputType = {
    id?: true
    provider?: true
    accountId?: true
    accessToken?: true
    refreshToken?: true
    expiryDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IntegrationMaxAggregateInputType = {
    id?: true
    provider?: true
    accountId?: true
    accessToken?: true
    refreshToken?: true
    expiryDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IntegrationCountAggregateInputType = {
    id?: true
    provider?: true
    accountId?: true
    accessToken?: true
    refreshToken?: true
    expiryDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IntegrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Integration to aggregate.
     */
    where?: IntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Integrations to fetch.
     */
    orderBy?: IntegrationOrderByWithRelationInput | IntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Integrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Integrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Integrations
    **/
    _count?: true | IntegrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IntegrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IntegrationMaxAggregateInputType
  }

  export type GetIntegrationAggregateType<T extends IntegrationAggregateArgs> = {
        [P in keyof T & keyof AggregateIntegration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIntegration[P]>
      : GetScalarType<T[P], AggregateIntegration[P]>
  }




  export type IntegrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IntegrationWhereInput
    orderBy?: IntegrationOrderByWithAggregationInput | IntegrationOrderByWithAggregationInput[]
    by: IntegrationScalarFieldEnum[] | IntegrationScalarFieldEnum
    having?: IntegrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IntegrationCountAggregateInputType | true
    _min?: IntegrationMinAggregateInputType
    _max?: IntegrationMaxAggregateInputType
  }

  export type IntegrationGroupByOutputType = {
    id: string
    provider: string
    accountId: string | null
    accessToken: string
    refreshToken: string | null
    expiryDate: Date | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: IntegrationCountAggregateOutputType | null
    _min: IntegrationMinAggregateOutputType | null
    _max: IntegrationMaxAggregateOutputType | null
  }

  type GetIntegrationGroupByPayload<T extends IntegrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IntegrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IntegrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IntegrationGroupByOutputType[P]>
            : GetScalarType<T[P], IntegrationGroupByOutputType[P]>
        }
      >
    >


  export type IntegrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    accountId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiryDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["integration"]>

  export type IntegrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    accountId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiryDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["integration"]>

  export type IntegrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    accountId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiryDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["integration"]>

  export type IntegrationSelectScalar = {
    id?: boolean
    provider?: boolean
    accountId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    expiryDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IntegrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "accountId" | "accessToken" | "refreshToken" | "expiryDate" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["integration"]>

  export type $IntegrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Integration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: string
      accountId: string | null
      accessToken: string
      refreshToken: string | null
      expiryDate: Date | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["integration"]>
    composites: {}
  }

  type IntegrationGetPayload<S extends boolean | null | undefined | IntegrationDefaultArgs> = $Result.GetResult<Prisma.$IntegrationPayload, S>

  type IntegrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IntegrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IntegrationCountAggregateInputType | true
    }

  export interface IntegrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Integration'], meta: { name: 'Integration' } }
    /**
     * Find zero or one Integration that matches the filter.
     * @param {IntegrationFindUniqueArgs} args - Arguments to find a Integration
     * @example
     * // Get one Integration
     * const integration = await prisma.integration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IntegrationFindUniqueArgs>(args: SelectSubset<T, IntegrationFindUniqueArgs<ExtArgs>>): Prisma__IntegrationClient<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Integration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IntegrationFindUniqueOrThrowArgs} args - Arguments to find a Integration
     * @example
     * // Get one Integration
     * const integration = await prisma.integration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IntegrationFindUniqueOrThrowArgs>(args: SelectSubset<T, IntegrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IntegrationClient<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Integration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationFindFirstArgs} args - Arguments to find a Integration
     * @example
     * // Get one Integration
     * const integration = await prisma.integration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IntegrationFindFirstArgs>(args?: SelectSubset<T, IntegrationFindFirstArgs<ExtArgs>>): Prisma__IntegrationClient<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Integration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationFindFirstOrThrowArgs} args - Arguments to find a Integration
     * @example
     * // Get one Integration
     * const integration = await prisma.integration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IntegrationFindFirstOrThrowArgs>(args?: SelectSubset<T, IntegrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__IntegrationClient<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Integrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Integrations
     * const integrations = await prisma.integration.findMany()
     * 
     * // Get first 10 Integrations
     * const integrations = await prisma.integration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const integrationWithIdOnly = await prisma.integration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IntegrationFindManyArgs>(args?: SelectSubset<T, IntegrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Integration.
     * @param {IntegrationCreateArgs} args - Arguments to create a Integration.
     * @example
     * // Create one Integration
     * const Integration = await prisma.integration.create({
     *   data: {
     *     // ... data to create a Integration
     *   }
     * })
     * 
     */
    create<T extends IntegrationCreateArgs>(args: SelectSubset<T, IntegrationCreateArgs<ExtArgs>>): Prisma__IntegrationClient<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Integrations.
     * @param {IntegrationCreateManyArgs} args - Arguments to create many Integrations.
     * @example
     * // Create many Integrations
     * const integration = await prisma.integration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IntegrationCreateManyArgs>(args?: SelectSubset<T, IntegrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Integrations and returns the data saved in the database.
     * @param {IntegrationCreateManyAndReturnArgs} args - Arguments to create many Integrations.
     * @example
     * // Create many Integrations
     * const integration = await prisma.integration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Integrations and only return the `id`
     * const integrationWithIdOnly = await prisma.integration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IntegrationCreateManyAndReturnArgs>(args?: SelectSubset<T, IntegrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Integration.
     * @param {IntegrationDeleteArgs} args - Arguments to delete one Integration.
     * @example
     * // Delete one Integration
     * const Integration = await prisma.integration.delete({
     *   where: {
     *     // ... filter to delete one Integration
     *   }
     * })
     * 
     */
    delete<T extends IntegrationDeleteArgs>(args: SelectSubset<T, IntegrationDeleteArgs<ExtArgs>>): Prisma__IntegrationClient<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Integration.
     * @param {IntegrationUpdateArgs} args - Arguments to update one Integration.
     * @example
     * // Update one Integration
     * const integration = await prisma.integration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IntegrationUpdateArgs>(args: SelectSubset<T, IntegrationUpdateArgs<ExtArgs>>): Prisma__IntegrationClient<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Integrations.
     * @param {IntegrationDeleteManyArgs} args - Arguments to filter Integrations to delete.
     * @example
     * // Delete a few Integrations
     * const { count } = await prisma.integration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IntegrationDeleteManyArgs>(args?: SelectSubset<T, IntegrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Integrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Integrations
     * const integration = await prisma.integration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IntegrationUpdateManyArgs>(args: SelectSubset<T, IntegrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Integrations and returns the data updated in the database.
     * @param {IntegrationUpdateManyAndReturnArgs} args - Arguments to update many Integrations.
     * @example
     * // Update many Integrations
     * const integration = await prisma.integration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Integrations and only return the `id`
     * const integrationWithIdOnly = await prisma.integration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IntegrationUpdateManyAndReturnArgs>(args: SelectSubset<T, IntegrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Integration.
     * @param {IntegrationUpsertArgs} args - Arguments to update or create a Integration.
     * @example
     * // Update or create a Integration
     * const integration = await prisma.integration.upsert({
     *   create: {
     *     // ... data to create a Integration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Integration we want to update
     *   }
     * })
     */
    upsert<T extends IntegrationUpsertArgs>(args: SelectSubset<T, IntegrationUpsertArgs<ExtArgs>>): Prisma__IntegrationClient<$Result.GetResult<Prisma.$IntegrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Integrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationCountArgs} args - Arguments to filter Integrations to count.
     * @example
     * // Count the number of Integrations
     * const count = await prisma.integration.count({
     *   where: {
     *     // ... the filter for the Integrations we want to count
     *   }
     * })
    **/
    count<T extends IntegrationCountArgs>(
      args?: Subset<T, IntegrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IntegrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Integration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IntegrationAggregateArgs>(args: Subset<T, IntegrationAggregateArgs>): Prisma.PrismaPromise<GetIntegrationAggregateType<T>>

    /**
     * Group by Integration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IntegrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IntegrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IntegrationGroupByArgs['orderBy'] }
        : { orderBy?: IntegrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IntegrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIntegrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Integration model
   */
  readonly fields: IntegrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Integration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IntegrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Integration model
   */
  interface IntegrationFieldRefs {
    readonly id: FieldRef<"Integration", 'String'>
    readonly provider: FieldRef<"Integration", 'String'>
    readonly accountId: FieldRef<"Integration", 'String'>
    readonly accessToken: FieldRef<"Integration", 'String'>
    readonly refreshToken: FieldRef<"Integration", 'String'>
    readonly expiryDate: FieldRef<"Integration", 'DateTime'>
    readonly status: FieldRef<"Integration", 'String'>
    readonly createdAt: FieldRef<"Integration", 'DateTime'>
    readonly updatedAt: FieldRef<"Integration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Integration findUnique
   */
  export type IntegrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * Filter, which Integration to fetch.
     */
    where: IntegrationWhereUniqueInput
  }

  /**
   * Integration findUniqueOrThrow
   */
  export type IntegrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * Filter, which Integration to fetch.
     */
    where: IntegrationWhereUniqueInput
  }

  /**
   * Integration findFirst
   */
  export type IntegrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * Filter, which Integration to fetch.
     */
    where?: IntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Integrations to fetch.
     */
    orderBy?: IntegrationOrderByWithRelationInput | IntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Integrations.
     */
    cursor?: IntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Integrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Integrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Integrations.
     */
    distinct?: IntegrationScalarFieldEnum | IntegrationScalarFieldEnum[]
  }

  /**
   * Integration findFirstOrThrow
   */
  export type IntegrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * Filter, which Integration to fetch.
     */
    where?: IntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Integrations to fetch.
     */
    orderBy?: IntegrationOrderByWithRelationInput | IntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Integrations.
     */
    cursor?: IntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Integrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Integrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Integrations.
     */
    distinct?: IntegrationScalarFieldEnum | IntegrationScalarFieldEnum[]
  }

  /**
   * Integration findMany
   */
  export type IntegrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * Filter, which Integrations to fetch.
     */
    where?: IntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Integrations to fetch.
     */
    orderBy?: IntegrationOrderByWithRelationInput | IntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Integrations.
     */
    cursor?: IntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Integrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Integrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Integrations.
     */
    distinct?: IntegrationScalarFieldEnum | IntegrationScalarFieldEnum[]
  }

  /**
   * Integration create
   */
  export type IntegrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * The data needed to create a Integration.
     */
    data: XOR<IntegrationCreateInput, IntegrationUncheckedCreateInput>
  }

  /**
   * Integration createMany
   */
  export type IntegrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Integrations.
     */
    data: IntegrationCreateManyInput | IntegrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Integration createManyAndReturn
   */
  export type IntegrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * The data used to create many Integrations.
     */
    data: IntegrationCreateManyInput | IntegrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Integration update
   */
  export type IntegrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * The data needed to update a Integration.
     */
    data: XOR<IntegrationUpdateInput, IntegrationUncheckedUpdateInput>
    /**
     * Choose, which Integration to update.
     */
    where: IntegrationWhereUniqueInput
  }

  /**
   * Integration updateMany
   */
  export type IntegrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Integrations.
     */
    data: XOR<IntegrationUpdateManyMutationInput, IntegrationUncheckedUpdateManyInput>
    /**
     * Filter which Integrations to update
     */
    where?: IntegrationWhereInput
    /**
     * Limit how many Integrations to update.
     */
    limit?: number
  }

  /**
   * Integration updateManyAndReturn
   */
  export type IntegrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * The data used to update Integrations.
     */
    data: XOR<IntegrationUpdateManyMutationInput, IntegrationUncheckedUpdateManyInput>
    /**
     * Filter which Integrations to update
     */
    where?: IntegrationWhereInput
    /**
     * Limit how many Integrations to update.
     */
    limit?: number
  }

  /**
   * Integration upsert
   */
  export type IntegrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * The filter to search for the Integration to update in case it exists.
     */
    where: IntegrationWhereUniqueInput
    /**
     * In case the Integration found by the `where` argument doesn't exist, create a new Integration with this data.
     */
    create: XOR<IntegrationCreateInput, IntegrationUncheckedCreateInput>
    /**
     * In case the Integration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IntegrationUpdateInput, IntegrationUncheckedUpdateInput>
  }

  /**
   * Integration delete
   */
  export type IntegrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
    /**
     * Filter which Integration to delete.
     */
    where: IntegrationWhereUniqueInput
  }

  /**
   * Integration deleteMany
   */
  export type IntegrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Integrations to delete
     */
    where?: IntegrationWhereInput
    /**
     * Limit how many Integrations to delete.
     */
    limit?: number
  }

  /**
   * Integration without action
   */
  export type IntegrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Integration
     */
    select?: IntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Integration
     */
    omit?: IntegrationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LeadScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    company: 'company',
    phone: 'phone',
    intent: 'intent',
    notes: 'notes',
    status: 'status',
    score: 'score',
    sourceUrl: 'sourceUrl',
    utmSource: 'utmSource',
    utmMedium: 'utmMedium',
    utmCampaign: 'utmCampaign',
    utmTerm: 'utmTerm',
    utmContent: 'utmContent',
    referrer: 'referrer',
    respondedAt: 'respondedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum]


  export const LeadStatusEventScalarFieldEnum: {
    id: 'id',
    leadId: 'leadId',
    fromStatus: 'fromStatus',
    toStatus: 'toStatus',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type LeadStatusEventScalarFieldEnum = (typeof LeadStatusEventScalarFieldEnum)[keyof typeof LeadStatusEventScalarFieldEnum]


  export const BlogPostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    excerpt: 'excerpt',
    coverImage: 'coverImage',
    content: 'content',
    author: 'author',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum]


  export const TrackingEventScalarFieldEnum: {
    id: 'id',
    eventName: 'eventName',
    pageUrl: 'pageUrl',
    pagePath: 'pagePath',
    utmSource: 'utmSource',
    utmMedium: 'utmMedium',
    utmCampaign: 'utmCampaign',
    device: 'device',
    sessionId: 'sessionId',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type TrackingEventScalarFieldEnum = (typeof TrackingEventScalarFieldEnum)[keyof typeof TrackingEventScalarFieldEnum]


  export const DealScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    status: 'status',
    expectedCloseAt: 'expectedCloseAt',
    leadId: 'leadId',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DealScalarFieldEnum = (typeof DealScalarFieldEnum)[keyof typeof DealScalarFieldEnum]


  export const AlertRuleScalarFieldEnum: {
    id: 'id',
    type: 'type',
    threshold: 'threshold',
    enabled: 'enabled',
    cooldownMinutes: 'cooldownMinutes',
    lastTriggeredAt: 'lastTriggeredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AlertRuleScalarFieldEnum = (typeof AlertRuleScalarFieldEnum)[keyof typeof AlertRuleScalarFieldEnum]


  export const AlertHistoryScalarFieldEnum: {
    id: 'id',
    ruleId: 'ruleId',
    severity: 'severity',
    message: 'message',
    source: 'source',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type AlertHistoryScalarFieldEnum = (typeof AlertHistoryScalarFieldEnum)[keyof typeof AlertHistoryScalarFieldEnum]


  export const NotificationTargetScalarFieldEnum: {
    id: 'id',
    type: 'type',
    destination: 'destination',
    enabled: 'enabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationTargetScalarFieldEnum = (typeof NotificationTargetScalarFieldEnum)[keyof typeof NotificationTargetScalarFieldEnum]


  export const SystemSettingScalarFieldEnum: {
    key: 'key',
    value: 'value',
    isSecret: 'isSecret',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt'
  };

  export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    oldValue: 'oldValue',
    newValue: 'newValue',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const IntegrationScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    accountId: 'accountId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    expiryDate: 'expiryDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IntegrationScalarFieldEnum = (typeof IntegrationScalarFieldEnum)[keyof typeof IntegrationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type LeadWhereInput = {
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    id?: StringFilter<"Lead"> | string
    name?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    company?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    intent?: StringNullableFilter<"Lead"> | string | null
    notes?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    score?: IntFilter<"Lead"> | number
    sourceUrl?: StringNullableFilter<"Lead"> | string | null
    utmSource?: StringNullableFilter<"Lead"> | string | null
    utmMedium?: StringNullableFilter<"Lead"> | string | null
    utmCampaign?: StringNullableFilter<"Lead"> | string | null
    utmTerm?: StringNullableFilter<"Lead"> | string | null
    utmContent?: StringNullableFilter<"Lead"> | string | null
    referrer?: StringNullableFilter<"Lead"> | string | null
    respondedAt?: DateTimeNullableFilter<"Lead"> | Date | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    statusHistory?: LeadStatusEventListRelationFilter
    deals?: DealListRelationFilter
  }

  export type LeadOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    company?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    intent?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    score?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    utmSource?: SortOrderInput | SortOrder
    utmMedium?: SortOrderInput | SortOrder
    utmCampaign?: SortOrderInput | SortOrder
    utmTerm?: SortOrderInput | SortOrder
    utmContent?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    respondedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    statusHistory?: LeadStatusEventOrderByRelationAggregateInput
    deals?: DealOrderByRelationAggregateInput
  }

  export type LeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadWhereInput | LeadWhereInput[]
    OR?: LeadWhereInput[]
    NOT?: LeadWhereInput | LeadWhereInput[]
    name?: StringFilter<"Lead"> | string
    email?: StringFilter<"Lead"> | string
    company?: StringNullableFilter<"Lead"> | string | null
    phone?: StringNullableFilter<"Lead"> | string | null
    intent?: StringNullableFilter<"Lead"> | string | null
    notes?: StringNullableFilter<"Lead"> | string | null
    status?: StringFilter<"Lead"> | string
    score?: IntFilter<"Lead"> | number
    sourceUrl?: StringNullableFilter<"Lead"> | string | null
    utmSource?: StringNullableFilter<"Lead"> | string | null
    utmMedium?: StringNullableFilter<"Lead"> | string | null
    utmCampaign?: StringNullableFilter<"Lead"> | string | null
    utmTerm?: StringNullableFilter<"Lead"> | string | null
    utmContent?: StringNullableFilter<"Lead"> | string | null
    referrer?: StringNullableFilter<"Lead"> | string | null
    respondedAt?: DateTimeNullableFilter<"Lead"> | Date | string | null
    createdAt?: DateTimeFilter<"Lead"> | Date | string
    updatedAt?: DateTimeFilter<"Lead"> | Date | string
    statusHistory?: LeadStatusEventListRelationFilter
    deals?: DealListRelationFilter
  }, "id">

  export type LeadOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    company?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    intent?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    status?: SortOrder
    score?: SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    utmSource?: SortOrderInput | SortOrder
    utmMedium?: SortOrderInput | SortOrder
    utmCampaign?: SortOrderInput | SortOrder
    utmTerm?: SortOrderInput | SortOrder
    utmContent?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    respondedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeadCountOrderByAggregateInput
    _avg?: LeadAvgOrderByAggregateInput
    _max?: LeadMaxOrderByAggregateInput
    _min?: LeadMinOrderByAggregateInput
    _sum?: LeadSumOrderByAggregateInput
  }

  export type LeadScalarWhereWithAggregatesInput = {
    AND?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    OR?: LeadScalarWhereWithAggregatesInput[]
    NOT?: LeadScalarWhereWithAggregatesInput | LeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lead"> | string
    name?: StringWithAggregatesFilter<"Lead"> | string
    email?: StringWithAggregatesFilter<"Lead"> | string
    company?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    intent?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    status?: StringWithAggregatesFilter<"Lead"> | string
    score?: IntWithAggregatesFilter<"Lead"> | number
    sourceUrl?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    utmSource?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    utmMedium?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    utmCampaign?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    utmTerm?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    utmContent?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    referrer?: StringNullableWithAggregatesFilter<"Lead"> | string | null
    respondedAt?: DateTimeNullableWithAggregatesFilter<"Lead"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lead"> | Date | string
  }

  export type LeadStatusEventWhereInput = {
    AND?: LeadStatusEventWhereInput | LeadStatusEventWhereInput[]
    OR?: LeadStatusEventWhereInput[]
    NOT?: LeadStatusEventWhereInput | LeadStatusEventWhereInput[]
    id?: StringFilter<"LeadStatusEvent"> | string
    leadId?: StringFilter<"LeadStatusEvent"> | string
    fromStatus?: StringFilter<"LeadStatusEvent"> | string
    toStatus?: StringFilter<"LeadStatusEvent"> | string
    note?: StringNullableFilter<"LeadStatusEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadStatusEvent"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }

  export type LeadStatusEventOrderByWithRelationInput = {
    id?: SortOrder
    leadId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type LeadStatusEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeadStatusEventWhereInput | LeadStatusEventWhereInput[]
    OR?: LeadStatusEventWhereInput[]
    NOT?: LeadStatusEventWhereInput | LeadStatusEventWhereInput[]
    leadId?: StringFilter<"LeadStatusEvent"> | string
    fromStatus?: StringFilter<"LeadStatusEvent"> | string
    toStatus?: StringFilter<"LeadStatusEvent"> | string
    note?: StringNullableFilter<"LeadStatusEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadStatusEvent"> | Date | string
    lead?: XOR<LeadScalarRelationFilter, LeadWhereInput>
  }, "id">

  export type LeadStatusEventOrderByWithAggregationInput = {
    id?: SortOrder
    leadId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LeadStatusEventCountOrderByAggregateInput
    _max?: LeadStatusEventMaxOrderByAggregateInput
    _min?: LeadStatusEventMinOrderByAggregateInput
  }

  export type LeadStatusEventScalarWhereWithAggregatesInput = {
    AND?: LeadStatusEventScalarWhereWithAggregatesInput | LeadStatusEventScalarWhereWithAggregatesInput[]
    OR?: LeadStatusEventScalarWhereWithAggregatesInput[]
    NOT?: LeadStatusEventScalarWhereWithAggregatesInput | LeadStatusEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeadStatusEvent"> | string
    leadId?: StringWithAggregatesFilter<"LeadStatusEvent"> | string
    fromStatus?: StringWithAggregatesFilter<"LeadStatusEvent"> | string
    toStatus?: StringWithAggregatesFilter<"LeadStatusEvent"> | string
    note?: StringNullableWithAggregatesFilter<"LeadStatusEvent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LeadStatusEvent"> | Date | string
  }

  export type BlogPostWhereInput = {
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    id?: StringFilter<"BlogPost"> | string
    title?: StringFilter<"BlogPost"> | string
    slug?: StringFilter<"BlogPost"> | string
    excerpt?: StringNullableFilter<"BlogPost"> | string | null
    coverImage?: StringNullableFilter<"BlogPost"> | string | null
    content?: StringFilter<"BlogPost"> | string
    author?: StringFilter<"BlogPost"> | string
    published?: BoolFilter<"BlogPost"> | boolean
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
  }

  export type BlogPostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    content?: SortOrder
    author?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    title?: StringFilter<"BlogPost"> | string
    excerpt?: StringNullableFilter<"BlogPost"> | string | null
    coverImage?: StringNullableFilter<"BlogPost"> | string | null
    content?: StringFilter<"BlogPost"> | string
    author?: StringFilter<"BlogPost"> | string
    published?: BoolFilter<"BlogPost"> | boolean
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
  }, "id" | "slug">

  export type BlogPostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    content?: SortOrder
    author?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BlogPostCountOrderByAggregateInput
    _max?: BlogPostMaxOrderByAggregateInput
    _min?: BlogPostMinOrderByAggregateInput
  }

  export type BlogPostScalarWhereWithAggregatesInput = {
    AND?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    OR?: BlogPostScalarWhereWithAggregatesInput[]
    NOT?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BlogPost"> | string
    title?: StringWithAggregatesFilter<"BlogPost"> | string
    slug?: StringWithAggregatesFilter<"BlogPost"> | string
    excerpt?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    content?: StringWithAggregatesFilter<"BlogPost"> | string
    author?: StringWithAggregatesFilter<"BlogPost"> | string
    published?: BoolWithAggregatesFilter<"BlogPost"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
  }

  export type TrackingEventWhereInput = {
    AND?: TrackingEventWhereInput | TrackingEventWhereInput[]
    OR?: TrackingEventWhereInput[]
    NOT?: TrackingEventWhereInput | TrackingEventWhereInput[]
    id?: StringFilter<"TrackingEvent"> | string
    eventName?: StringFilter<"TrackingEvent"> | string
    pageUrl?: StringNullableFilter<"TrackingEvent"> | string | null
    pagePath?: StringNullableFilter<"TrackingEvent"> | string | null
    utmSource?: StringNullableFilter<"TrackingEvent"> | string | null
    utmMedium?: StringNullableFilter<"TrackingEvent"> | string | null
    utmCampaign?: StringNullableFilter<"TrackingEvent"> | string | null
    device?: StringNullableFilter<"TrackingEvent"> | string | null
    sessionId?: StringNullableFilter<"TrackingEvent"> | string | null
    metadata?: JsonNullableFilter<"TrackingEvent">
    createdAt?: DateTimeFilter<"TrackingEvent"> | Date | string
  }

  export type TrackingEventOrderByWithRelationInput = {
    id?: SortOrder
    eventName?: SortOrder
    pageUrl?: SortOrderInput | SortOrder
    pagePath?: SortOrderInput | SortOrder
    utmSource?: SortOrderInput | SortOrder
    utmMedium?: SortOrderInput | SortOrder
    utmCampaign?: SortOrderInput | SortOrder
    device?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type TrackingEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TrackingEventWhereInput | TrackingEventWhereInput[]
    OR?: TrackingEventWhereInput[]
    NOT?: TrackingEventWhereInput | TrackingEventWhereInput[]
    eventName?: StringFilter<"TrackingEvent"> | string
    pageUrl?: StringNullableFilter<"TrackingEvent"> | string | null
    pagePath?: StringNullableFilter<"TrackingEvent"> | string | null
    utmSource?: StringNullableFilter<"TrackingEvent"> | string | null
    utmMedium?: StringNullableFilter<"TrackingEvent"> | string | null
    utmCampaign?: StringNullableFilter<"TrackingEvent"> | string | null
    device?: StringNullableFilter<"TrackingEvent"> | string | null
    sessionId?: StringNullableFilter<"TrackingEvent"> | string | null
    metadata?: JsonNullableFilter<"TrackingEvent">
    createdAt?: DateTimeFilter<"TrackingEvent"> | Date | string
  }, "id">

  export type TrackingEventOrderByWithAggregationInput = {
    id?: SortOrder
    eventName?: SortOrder
    pageUrl?: SortOrderInput | SortOrder
    pagePath?: SortOrderInput | SortOrder
    utmSource?: SortOrderInput | SortOrder
    utmMedium?: SortOrderInput | SortOrder
    utmCampaign?: SortOrderInput | SortOrder
    device?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TrackingEventCountOrderByAggregateInput
    _max?: TrackingEventMaxOrderByAggregateInput
    _min?: TrackingEventMinOrderByAggregateInput
  }

  export type TrackingEventScalarWhereWithAggregatesInput = {
    AND?: TrackingEventScalarWhereWithAggregatesInput | TrackingEventScalarWhereWithAggregatesInput[]
    OR?: TrackingEventScalarWhereWithAggregatesInput[]
    NOT?: TrackingEventScalarWhereWithAggregatesInput | TrackingEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TrackingEvent"> | string
    eventName?: StringWithAggregatesFilter<"TrackingEvent"> | string
    pageUrl?: StringNullableWithAggregatesFilter<"TrackingEvent"> | string | null
    pagePath?: StringNullableWithAggregatesFilter<"TrackingEvent"> | string | null
    utmSource?: StringNullableWithAggregatesFilter<"TrackingEvent"> | string | null
    utmMedium?: StringNullableWithAggregatesFilter<"TrackingEvent"> | string | null
    utmCampaign?: StringNullableWithAggregatesFilter<"TrackingEvent"> | string | null
    device?: StringNullableWithAggregatesFilter<"TrackingEvent"> | string | null
    sessionId?: StringNullableWithAggregatesFilter<"TrackingEvent"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"TrackingEvent">
    createdAt?: DateTimeWithAggregatesFilter<"TrackingEvent"> | Date | string
  }

  export type DealWhereInput = {
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    id?: StringFilter<"Deal"> | string
    name?: StringFilter<"Deal"> | string
    value?: FloatFilter<"Deal"> | number
    status?: StringFilter<"Deal"> | string
    expectedCloseAt?: DateTimeNullableFilter<"Deal"> | Date | string | null
    leadId?: StringNullableFilter<"Deal"> | string | null
    notes?: StringNullableFilter<"Deal"> | string | null
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    lead?: XOR<LeadNullableScalarRelationFilter, LeadWhereInput> | null
  }

  export type DealOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    status?: SortOrder
    expectedCloseAt?: SortOrderInput | SortOrder
    leadId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lead?: LeadOrderByWithRelationInput
  }

  export type DealWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DealWhereInput | DealWhereInput[]
    OR?: DealWhereInput[]
    NOT?: DealWhereInput | DealWhereInput[]
    name?: StringFilter<"Deal"> | string
    value?: FloatFilter<"Deal"> | number
    status?: StringFilter<"Deal"> | string
    expectedCloseAt?: DateTimeNullableFilter<"Deal"> | Date | string | null
    leadId?: StringNullableFilter<"Deal"> | string | null
    notes?: StringNullableFilter<"Deal"> | string | null
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
    lead?: XOR<LeadNullableScalarRelationFilter, LeadWhereInput> | null
  }, "id">

  export type DealOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    status?: SortOrder
    expectedCloseAt?: SortOrderInput | SortOrder
    leadId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DealCountOrderByAggregateInput
    _avg?: DealAvgOrderByAggregateInput
    _max?: DealMaxOrderByAggregateInput
    _min?: DealMinOrderByAggregateInput
    _sum?: DealSumOrderByAggregateInput
  }

  export type DealScalarWhereWithAggregatesInput = {
    AND?: DealScalarWhereWithAggregatesInput | DealScalarWhereWithAggregatesInput[]
    OR?: DealScalarWhereWithAggregatesInput[]
    NOT?: DealScalarWhereWithAggregatesInput | DealScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Deal"> | string
    name?: StringWithAggregatesFilter<"Deal"> | string
    value?: FloatWithAggregatesFilter<"Deal"> | number
    status?: StringWithAggregatesFilter<"Deal"> | string
    expectedCloseAt?: DateTimeNullableWithAggregatesFilter<"Deal"> | Date | string | null
    leadId?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Deal"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Deal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Deal"> | Date | string
  }

  export type AlertRuleWhereInput = {
    AND?: AlertRuleWhereInput | AlertRuleWhereInput[]
    OR?: AlertRuleWhereInput[]
    NOT?: AlertRuleWhereInput | AlertRuleWhereInput[]
    id?: StringFilter<"AlertRule"> | string
    type?: StringFilter<"AlertRule"> | string
    threshold?: JsonNullableFilter<"AlertRule">
    enabled?: BoolFilter<"AlertRule"> | boolean
    cooldownMinutes?: IntFilter<"AlertRule"> | number
    lastTriggeredAt?: DateTimeNullableFilter<"AlertRule"> | Date | string | null
    createdAt?: DateTimeFilter<"AlertRule"> | Date | string
    updatedAt?: DateTimeFilter<"AlertRule"> | Date | string
    history?: AlertHistoryListRelationFilter
  }

  export type AlertRuleOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    threshold?: SortOrderInput | SortOrder
    enabled?: SortOrder
    cooldownMinutes?: SortOrder
    lastTriggeredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    history?: AlertHistoryOrderByRelationAggregateInput
  }

  export type AlertRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    type?: string
    AND?: AlertRuleWhereInput | AlertRuleWhereInput[]
    OR?: AlertRuleWhereInput[]
    NOT?: AlertRuleWhereInput | AlertRuleWhereInput[]
    threshold?: JsonNullableFilter<"AlertRule">
    enabled?: BoolFilter<"AlertRule"> | boolean
    cooldownMinutes?: IntFilter<"AlertRule"> | number
    lastTriggeredAt?: DateTimeNullableFilter<"AlertRule"> | Date | string | null
    createdAt?: DateTimeFilter<"AlertRule"> | Date | string
    updatedAt?: DateTimeFilter<"AlertRule"> | Date | string
    history?: AlertHistoryListRelationFilter
  }, "id" | "type">

  export type AlertRuleOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    threshold?: SortOrderInput | SortOrder
    enabled?: SortOrder
    cooldownMinutes?: SortOrder
    lastTriggeredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AlertRuleCountOrderByAggregateInput
    _avg?: AlertRuleAvgOrderByAggregateInput
    _max?: AlertRuleMaxOrderByAggregateInput
    _min?: AlertRuleMinOrderByAggregateInput
    _sum?: AlertRuleSumOrderByAggregateInput
  }

  export type AlertRuleScalarWhereWithAggregatesInput = {
    AND?: AlertRuleScalarWhereWithAggregatesInput | AlertRuleScalarWhereWithAggregatesInput[]
    OR?: AlertRuleScalarWhereWithAggregatesInput[]
    NOT?: AlertRuleScalarWhereWithAggregatesInput | AlertRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AlertRule"> | string
    type?: StringWithAggregatesFilter<"AlertRule"> | string
    threshold?: JsonNullableWithAggregatesFilter<"AlertRule">
    enabled?: BoolWithAggregatesFilter<"AlertRule"> | boolean
    cooldownMinutes?: IntWithAggregatesFilter<"AlertRule"> | number
    lastTriggeredAt?: DateTimeNullableWithAggregatesFilter<"AlertRule"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AlertRule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AlertRule"> | Date | string
  }

  export type AlertHistoryWhereInput = {
    AND?: AlertHistoryWhereInput | AlertHistoryWhereInput[]
    OR?: AlertHistoryWhereInput[]
    NOT?: AlertHistoryWhereInput | AlertHistoryWhereInput[]
    id?: StringFilter<"AlertHistory"> | string
    ruleId?: StringFilter<"AlertHistory"> | string
    severity?: StringFilter<"AlertHistory"> | string
    message?: StringFilter<"AlertHistory"> | string
    source?: StringFilter<"AlertHistory"> | string
    status?: StringFilter<"AlertHistory"> | string
    createdAt?: DateTimeFilter<"AlertHistory"> | Date | string
    rule?: XOR<AlertRuleScalarRelationFilter, AlertRuleWhereInput>
  }

  export type AlertHistoryOrderByWithRelationInput = {
    id?: SortOrder
    ruleId?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    source?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    rule?: AlertRuleOrderByWithRelationInput
  }

  export type AlertHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlertHistoryWhereInput | AlertHistoryWhereInput[]
    OR?: AlertHistoryWhereInput[]
    NOT?: AlertHistoryWhereInput | AlertHistoryWhereInput[]
    ruleId?: StringFilter<"AlertHistory"> | string
    severity?: StringFilter<"AlertHistory"> | string
    message?: StringFilter<"AlertHistory"> | string
    source?: StringFilter<"AlertHistory"> | string
    status?: StringFilter<"AlertHistory"> | string
    createdAt?: DateTimeFilter<"AlertHistory"> | Date | string
    rule?: XOR<AlertRuleScalarRelationFilter, AlertRuleWhereInput>
  }, "id">

  export type AlertHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    ruleId?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    source?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: AlertHistoryCountOrderByAggregateInput
    _max?: AlertHistoryMaxOrderByAggregateInput
    _min?: AlertHistoryMinOrderByAggregateInput
  }

  export type AlertHistoryScalarWhereWithAggregatesInput = {
    AND?: AlertHistoryScalarWhereWithAggregatesInput | AlertHistoryScalarWhereWithAggregatesInput[]
    OR?: AlertHistoryScalarWhereWithAggregatesInput[]
    NOT?: AlertHistoryScalarWhereWithAggregatesInput | AlertHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AlertHistory"> | string
    ruleId?: StringWithAggregatesFilter<"AlertHistory"> | string
    severity?: StringWithAggregatesFilter<"AlertHistory"> | string
    message?: StringWithAggregatesFilter<"AlertHistory"> | string
    source?: StringWithAggregatesFilter<"AlertHistory"> | string
    status?: StringWithAggregatesFilter<"AlertHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AlertHistory"> | Date | string
  }

  export type NotificationTargetWhereInput = {
    AND?: NotificationTargetWhereInput | NotificationTargetWhereInput[]
    OR?: NotificationTargetWhereInput[]
    NOT?: NotificationTargetWhereInput | NotificationTargetWhereInput[]
    id?: StringFilter<"NotificationTarget"> | string
    type?: StringFilter<"NotificationTarget"> | string
    destination?: StringFilter<"NotificationTarget"> | string
    enabled?: BoolFilter<"NotificationTarget"> | boolean
    createdAt?: DateTimeFilter<"NotificationTarget"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationTarget"> | Date | string
  }

  export type NotificationTargetOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    destination?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationTargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationTargetWhereInput | NotificationTargetWhereInput[]
    OR?: NotificationTargetWhereInput[]
    NOT?: NotificationTargetWhereInput | NotificationTargetWhereInput[]
    type?: StringFilter<"NotificationTarget"> | string
    destination?: StringFilter<"NotificationTarget"> | string
    enabled?: BoolFilter<"NotificationTarget"> | boolean
    createdAt?: DateTimeFilter<"NotificationTarget"> | Date | string
    updatedAt?: DateTimeFilter<"NotificationTarget"> | Date | string
  }, "id">

  export type NotificationTargetOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    destination?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationTargetCountOrderByAggregateInput
    _max?: NotificationTargetMaxOrderByAggregateInput
    _min?: NotificationTargetMinOrderByAggregateInput
  }

  export type NotificationTargetScalarWhereWithAggregatesInput = {
    AND?: NotificationTargetScalarWhereWithAggregatesInput | NotificationTargetScalarWhereWithAggregatesInput[]
    OR?: NotificationTargetScalarWhereWithAggregatesInput[]
    NOT?: NotificationTargetScalarWhereWithAggregatesInput | NotificationTargetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NotificationTarget"> | string
    type?: StringWithAggregatesFilter<"NotificationTarget"> | string
    destination?: StringWithAggregatesFilter<"NotificationTarget"> | string
    enabled?: BoolWithAggregatesFilter<"NotificationTarget"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"NotificationTarget"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NotificationTarget"> | Date | string
  }

  export type SystemSettingWhereInput = {
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    key?: StringFilter<"SystemSetting"> | string
    value?: StringFilter<"SystemSetting"> | string
    isSecret?: BoolFilter<"SystemSetting"> | boolean
    updatedBy?: StringFilter<"SystemSetting"> | string
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }

  export type SystemSettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    isSecret?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    value?: StringFilter<"SystemSetting"> | string
    isSecret?: BoolFilter<"SystemSetting"> | boolean
    updatedBy?: StringFilter<"SystemSetting"> | string
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }, "key">

  export type SystemSettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    isSecret?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemSettingCountOrderByAggregateInput
    _max?: SystemSettingMaxOrderByAggregateInput
    _min?: SystemSettingMinOrderByAggregateInput
  }

  export type SystemSettingScalarWhereWithAggregatesInput = {
    AND?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    OR?: SystemSettingScalarWhereWithAggregatesInput[]
    NOT?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"SystemSetting"> | string
    value?: StringWithAggregatesFilter<"SystemSetting"> | string
    isSecret?: BoolWithAggregatesFilter<"SystemSetting"> | boolean
    updatedBy?: StringWithAggregatesFilter<"SystemSetting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemSetting"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    userId?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    entity?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    userId?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entity?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValue?: JsonNullableWithAggregatesFilter<"AuditLog">
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type IntegrationWhereInput = {
    AND?: IntegrationWhereInput | IntegrationWhereInput[]
    OR?: IntegrationWhereInput[]
    NOT?: IntegrationWhereInput | IntegrationWhereInput[]
    id?: StringFilter<"Integration"> | string
    provider?: StringFilter<"Integration"> | string
    accountId?: StringNullableFilter<"Integration"> | string | null
    accessToken?: StringFilter<"Integration"> | string
    refreshToken?: StringNullableFilter<"Integration"> | string | null
    expiryDate?: DateTimeNullableFilter<"Integration"> | Date | string | null
    status?: StringFilter<"Integration"> | string
    createdAt?: DateTimeFilter<"Integration"> | Date | string
    updatedAt?: DateTimeFilter<"Integration"> | Date | string
  }

  export type IntegrationOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    accountId?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntegrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider?: string
    AND?: IntegrationWhereInput | IntegrationWhereInput[]
    OR?: IntegrationWhereInput[]
    NOT?: IntegrationWhereInput | IntegrationWhereInput[]
    accountId?: StringNullableFilter<"Integration"> | string | null
    accessToken?: StringFilter<"Integration"> | string
    refreshToken?: StringNullableFilter<"Integration"> | string | null
    expiryDate?: DateTimeNullableFilter<"Integration"> | Date | string | null
    status?: StringFilter<"Integration"> | string
    createdAt?: DateTimeFilter<"Integration"> | Date | string
    updatedAt?: DateTimeFilter<"Integration"> | Date | string
  }, "id" | "provider">

  export type IntegrationOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    accountId?: SortOrderInput | SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    expiryDate?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IntegrationCountOrderByAggregateInput
    _max?: IntegrationMaxOrderByAggregateInput
    _min?: IntegrationMinOrderByAggregateInput
  }

  export type IntegrationScalarWhereWithAggregatesInput = {
    AND?: IntegrationScalarWhereWithAggregatesInput | IntegrationScalarWhereWithAggregatesInput[]
    OR?: IntegrationScalarWhereWithAggregatesInput[]
    NOT?: IntegrationScalarWhereWithAggregatesInput | IntegrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Integration"> | string
    provider?: StringWithAggregatesFilter<"Integration"> | string
    accountId?: StringNullableWithAggregatesFilter<"Integration"> | string | null
    accessToken?: StringWithAggregatesFilter<"Integration"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"Integration"> | string | null
    expiryDate?: DateTimeNullableWithAggregatesFilter<"Integration"> | Date | string | null
    status?: StringWithAggregatesFilter<"Integration"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Integration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Integration"> | Date | string
  }

  export type LeadCreateInput = {
    id?: string
    name: string
    email: string
    company?: string | null
    phone?: string | null
    intent?: string | null
    notes?: string | null
    status?: string
    score?: number
    sourceUrl?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmTerm?: string | null
    utmContent?: string | null
    referrer?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: LeadStatusEventCreateNestedManyWithoutLeadInput
    deals?: DealCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    company?: string | null
    phone?: string | null
    intent?: string | null
    notes?: string | null
    status?: string
    score?: number
    sourceUrl?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmTerm?: string | null
    utmContent?: string | null
    referrer?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: LeadStatusEventUncheckedCreateNestedManyWithoutLeadInput
    deals?: DealUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: LeadStatusEventUpdateManyWithoutLeadNestedInput
    deals?: DealUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: LeadStatusEventUncheckedUpdateManyWithoutLeadNestedInput
    deals?: DealUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateManyInput = {
    id?: string
    name: string
    email: string
    company?: string | null
    phone?: string | null
    intent?: string | null
    notes?: string | null
    status?: string
    score?: number
    sourceUrl?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmTerm?: string | null
    utmContent?: string | null
    referrer?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadStatusEventCreateInput = {
    id?: string
    fromStatus: string
    toStatus: string
    note?: string | null
    createdAt?: Date | string
    lead: LeadCreateNestedOneWithoutStatusHistoryInput
  }

  export type LeadStatusEventUncheckedCreateInput = {
    id?: string
    leadId: string
    fromStatus: string
    toStatus: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LeadStatusEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: StringFieldUpdateOperationsInput | string
    toStatus?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneRequiredWithoutStatusHistoryNestedInput
  }

  export type LeadStatusEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    fromStatus?: StringFieldUpdateOperationsInput | string
    toStatus?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadStatusEventCreateManyInput = {
    id?: string
    leadId: string
    fromStatus: string
    toStatus: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LeadStatusEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: StringFieldUpdateOperationsInput | string
    toStatus?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadStatusEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leadId?: StringFieldUpdateOperationsInput | string
    fromStatus?: StringFieldUpdateOperationsInput | string
    toStatus?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostCreateInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    coverImage?: string | null
    content: string
    author: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    coverImage?: string | null
    content: string
    author: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostCreateManyInput = {
    id?: string
    title: string
    slug: string
    excerpt?: string | null
    coverImage?: string | null
    content: string
    author: string
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingEventCreateInput = {
    id?: string
    eventName: string
    pageUrl?: string | null
    pagePath?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    device?: string | null
    sessionId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TrackingEventUncheckedCreateInput = {
    id?: string
    eventName: string
    pageUrl?: string | null
    pagePath?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    device?: string | null
    sessionId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TrackingEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    pageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pagePath?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    pageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pagePath?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingEventCreateManyInput = {
    id?: string
    eventName: string
    pageUrl?: string | null
    pagePath?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    device?: string | null
    sessionId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type TrackingEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    pageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pagePath?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TrackingEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    pageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pagePath?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealCreateInput = {
    id?: string
    name: string
    value?: number
    status?: string
    expectedCloseAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lead?: LeadCreateNestedOneWithoutDealsInput
  }

  export type DealUncheckedCreateInput = {
    id?: string
    name: string
    value?: number
    status?: string
    expectedCloseAt?: Date | string | null
    leadId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    expectedCloseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lead?: LeadUpdateOneWithoutDealsNestedInput
  }

  export type DealUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    expectedCloseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealCreateManyInput = {
    id?: string
    name: string
    value?: number
    status?: string
    expectedCloseAt?: Date | string | null
    leadId?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    expectedCloseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    expectedCloseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    leadId?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertRuleCreateInput = {
    id?: string
    type: string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    cooldownMinutes?: number
    lastTriggeredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    history?: AlertHistoryCreateNestedManyWithoutRuleInput
  }

  export type AlertRuleUncheckedCreateInput = {
    id?: string
    type: string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    cooldownMinutes?: number
    lastTriggeredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    history?: AlertHistoryUncheckedCreateNestedManyWithoutRuleInput
  }

  export type AlertRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    cooldownMinutes?: IntFieldUpdateOperationsInput | number
    lastTriggeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: AlertHistoryUpdateManyWithoutRuleNestedInput
  }

  export type AlertRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    cooldownMinutes?: IntFieldUpdateOperationsInput | number
    lastTriggeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: AlertHistoryUncheckedUpdateManyWithoutRuleNestedInput
  }

  export type AlertRuleCreateManyInput = {
    id?: string
    type: string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    cooldownMinutes?: number
    lastTriggeredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlertRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    cooldownMinutes?: IntFieldUpdateOperationsInput | number
    lastTriggeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    cooldownMinutes?: IntFieldUpdateOperationsInput | number
    lastTriggeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertHistoryCreateInput = {
    id?: string
    severity: string
    message: string
    source: string
    status?: string
    createdAt?: Date | string
    rule: AlertRuleCreateNestedOneWithoutHistoryInput
  }

  export type AlertHistoryUncheckedCreateInput = {
    id?: string
    ruleId: string
    severity: string
    message: string
    source: string
    status?: string
    createdAt?: Date | string
  }

  export type AlertHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rule?: AlertRuleUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type AlertHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleId?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertHistoryCreateManyInput = {
    id?: string
    ruleId: string
    severity: string
    message: string
    source: string
    status?: string
    createdAt?: Date | string
  }

  export type AlertHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ruleId?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationTargetCreateInput = {
    id?: string
    type: string
    destination: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationTargetUncheckedCreateInput = {
    id?: string
    type: string
    destination: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationTargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationTargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationTargetCreateManyInput = {
    id?: string
    type: string
    destination: string
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationTargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationTargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    destination?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateInput = {
    key: string
    value: string
    isSecret?: boolean
    updatedBy: string
    updatedAt?: Date | string
  }

  export type SystemSettingUncheckedCreateInput = {
    key: string
    value: string
    isSecret?: boolean
    updatedBy: string
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateManyInput = {
    key: string
    value: string
    isSecret?: boolean
    updatedBy: string
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    userId: string
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    userId: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    entity: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    userId: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationCreateInput = {
    id?: string
    provider: string
    accountId?: string | null
    accessToken: string
    refreshToken?: string | null
    expiryDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntegrationUncheckedCreateInput = {
    id?: string
    provider: string
    accountId?: string | null
    accessToken: string
    refreshToken?: string | null
    expiryDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntegrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationCreateManyInput = {
    id?: string
    provider: string
    accountId?: string | null
    accessToken: string
    refreshToken?: string | null
    expiryDate?: Date | string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IntegrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntegrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accountId?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiryDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LeadStatusEventListRelationFilter = {
    every?: LeadStatusEventWhereInput
    some?: LeadStatusEventWhereInput
    none?: LeadStatusEventWhereInput
  }

  export type DealListRelationFilter = {
    every?: DealWhereInput
    some?: DealWhereInput
    none?: DealWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LeadStatusEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DealOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeadCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    company?: SortOrder
    phone?: SortOrder
    intent?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    score?: SortOrder
    sourceUrl?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmTerm?: SortOrder
    utmContent?: SortOrder
    referrer?: SortOrder
    respondedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type LeadMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    company?: SortOrder
    phone?: SortOrder
    intent?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    score?: SortOrder
    sourceUrl?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmTerm?: SortOrder
    utmContent?: SortOrder
    referrer?: SortOrder
    respondedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    company?: SortOrder
    phone?: SortOrder
    intent?: SortOrder
    notes?: SortOrder
    status?: SortOrder
    score?: SortOrder
    sourceUrl?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    utmTerm?: SortOrder
    utmContent?: SortOrder
    referrer?: SortOrder
    respondedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type LeadScalarRelationFilter = {
    is?: LeadWhereInput
    isNot?: LeadWhereInput
  }

  export type LeadStatusEventCountOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadStatusEventMaxOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type LeadStatusEventMinOrderByAggregateInput = {
    id?: SortOrder
    leadId?: SortOrder
    fromStatus?: SortOrder
    toStatus?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BlogPostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    coverImage?: SortOrder
    content?: SortOrder
    author?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    coverImage?: SortOrder
    content?: SortOrder
    author?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    coverImage?: SortOrder
    content?: SortOrder
    author?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TrackingEventCountOrderByAggregateInput = {
    id?: SortOrder
    eventName?: SortOrder
    pageUrl?: SortOrder
    pagePath?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    device?: SortOrder
    sessionId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type TrackingEventMaxOrderByAggregateInput = {
    id?: SortOrder
    eventName?: SortOrder
    pageUrl?: SortOrder
    pagePath?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    device?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
  }

  export type TrackingEventMinOrderByAggregateInput = {
    id?: SortOrder
    eventName?: SortOrder
    pageUrl?: SortOrder
    pagePath?: SortOrder
    utmSource?: SortOrder
    utmMedium?: SortOrder
    utmCampaign?: SortOrder
    device?: SortOrder
    sessionId?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LeadNullableScalarRelationFilter = {
    is?: LeadWhereInput | null
    isNot?: LeadWhereInput | null
  }

  export type DealCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    status?: SortOrder
    expectedCloseAt?: SortOrder
    leadId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DealAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type DealMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    status?: SortOrder
    expectedCloseAt?: SortOrder
    leadId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DealMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    status?: SortOrder
    expectedCloseAt?: SortOrder
    leadId?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DealSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AlertHistoryListRelationFilter = {
    every?: AlertHistoryWhereInput
    some?: AlertHistoryWhereInput
    none?: AlertHistoryWhereInput
  }

  export type AlertHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlertRuleCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    threshold?: SortOrder
    enabled?: SortOrder
    cooldownMinutes?: SortOrder
    lastTriggeredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AlertRuleAvgOrderByAggregateInput = {
    cooldownMinutes?: SortOrder
  }

  export type AlertRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    enabled?: SortOrder
    cooldownMinutes?: SortOrder
    lastTriggeredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AlertRuleMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    enabled?: SortOrder
    cooldownMinutes?: SortOrder
    lastTriggeredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AlertRuleSumOrderByAggregateInput = {
    cooldownMinutes?: SortOrder
  }

  export type AlertRuleScalarRelationFilter = {
    is?: AlertRuleWhereInput
    isNot?: AlertRuleWhereInput
  }

  export type AlertHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    ruleId?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    source?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    ruleId?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    source?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    ruleId?: SortOrder
    severity?: SortOrder
    message?: SortOrder
    source?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationTargetCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    destination?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationTargetMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    destination?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationTargetMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    destination?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    isSecret?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    isSecret?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    isSecret?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type IntegrationCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    accountId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiryDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntegrationMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    accountId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiryDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntegrationMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    accountId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    expiryDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeadStatusEventCreateNestedManyWithoutLeadInput = {
    create?: XOR<LeadStatusEventCreateWithoutLeadInput, LeadStatusEventUncheckedCreateWithoutLeadInput> | LeadStatusEventCreateWithoutLeadInput[] | LeadStatusEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadStatusEventCreateOrConnectWithoutLeadInput | LeadStatusEventCreateOrConnectWithoutLeadInput[]
    createMany?: LeadStatusEventCreateManyLeadInputEnvelope
    connect?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
  }

  export type DealCreateNestedManyWithoutLeadInput = {
    create?: XOR<DealCreateWithoutLeadInput, DealUncheckedCreateWithoutLeadInput> | DealCreateWithoutLeadInput[] | DealUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: DealCreateOrConnectWithoutLeadInput | DealCreateOrConnectWithoutLeadInput[]
    createMany?: DealCreateManyLeadInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type LeadStatusEventUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<LeadStatusEventCreateWithoutLeadInput, LeadStatusEventUncheckedCreateWithoutLeadInput> | LeadStatusEventCreateWithoutLeadInput[] | LeadStatusEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadStatusEventCreateOrConnectWithoutLeadInput | LeadStatusEventCreateOrConnectWithoutLeadInput[]
    createMany?: LeadStatusEventCreateManyLeadInputEnvelope
    connect?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
  }

  export type DealUncheckedCreateNestedManyWithoutLeadInput = {
    create?: XOR<DealCreateWithoutLeadInput, DealUncheckedCreateWithoutLeadInput> | DealCreateWithoutLeadInput[] | DealUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: DealCreateOrConnectWithoutLeadInput | DealCreateOrConnectWithoutLeadInput[]
    createMany?: DealCreateManyLeadInputEnvelope
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LeadStatusEventUpdateManyWithoutLeadNestedInput = {
    create?: XOR<LeadStatusEventCreateWithoutLeadInput, LeadStatusEventUncheckedCreateWithoutLeadInput> | LeadStatusEventCreateWithoutLeadInput[] | LeadStatusEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadStatusEventCreateOrConnectWithoutLeadInput | LeadStatusEventCreateOrConnectWithoutLeadInput[]
    upsert?: LeadStatusEventUpsertWithWhereUniqueWithoutLeadInput | LeadStatusEventUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: LeadStatusEventCreateManyLeadInputEnvelope
    set?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
    disconnect?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
    delete?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
    connect?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
    update?: LeadStatusEventUpdateWithWhereUniqueWithoutLeadInput | LeadStatusEventUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: LeadStatusEventUpdateManyWithWhereWithoutLeadInput | LeadStatusEventUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: LeadStatusEventScalarWhereInput | LeadStatusEventScalarWhereInput[]
  }

  export type DealUpdateManyWithoutLeadNestedInput = {
    create?: XOR<DealCreateWithoutLeadInput, DealUncheckedCreateWithoutLeadInput> | DealCreateWithoutLeadInput[] | DealUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: DealCreateOrConnectWithoutLeadInput | DealCreateOrConnectWithoutLeadInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutLeadInput | DealUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: DealCreateManyLeadInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutLeadInput | DealUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: DealUpdateManyWithWhereWithoutLeadInput | DealUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type LeadStatusEventUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<LeadStatusEventCreateWithoutLeadInput, LeadStatusEventUncheckedCreateWithoutLeadInput> | LeadStatusEventCreateWithoutLeadInput[] | LeadStatusEventUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: LeadStatusEventCreateOrConnectWithoutLeadInput | LeadStatusEventCreateOrConnectWithoutLeadInput[]
    upsert?: LeadStatusEventUpsertWithWhereUniqueWithoutLeadInput | LeadStatusEventUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: LeadStatusEventCreateManyLeadInputEnvelope
    set?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
    disconnect?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
    delete?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
    connect?: LeadStatusEventWhereUniqueInput | LeadStatusEventWhereUniqueInput[]
    update?: LeadStatusEventUpdateWithWhereUniqueWithoutLeadInput | LeadStatusEventUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: LeadStatusEventUpdateManyWithWhereWithoutLeadInput | LeadStatusEventUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: LeadStatusEventScalarWhereInput | LeadStatusEventScalarWhereInput[]
  }

  export type DealUncheckedUpdateManyWithoutLeadNestedInput = {
    create?: XOR<DealCreateWithoutLeadInput, DealUncheckedCreateWithoutLeadInput> | DealCreateWithoutLeadInput[] | DealUncheckedCreateWithoutLeadInput[]
    connectOrCreate?: DealCreateOrConnectWithoutLeadInput | DealCreateOrConnectWithoutLeadInput[]
    upsert?: DealUpsertWithWhereUniqueWithoutLeadInput | DealUpsertWithWhereUniqueWithoutLeadInput[]
    createMany?: DealCreateManyLeadInputEnvelope
    set?: DealWhereUniqueInput | DealWhereUniqueInput[]
    disconnect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    delete?: DealWhereUniqueInput | DealWhereUniqueInput[]
    connect?: DealWhereUniqueInput | DealWhereUniqueInput[]
    update?: DealUpdateWithWhereUniqueWithoutLeadInput | DealUpdateWithWhereUniqueWithoutLeadInput[]
    updateMany?: DealUpdateManyWithWhereWithoutLeadInput | DealUpdateManyWithWhereWithoutLeadInput[]
    deleteMany?: DealScalarWhereInput | DealScalarWhereInput[]
  }

  export type LeadCreateNestedOneWithoutStatusHistoryInput = {
    create?: XOR<LeadCreateWithoutStatusHistoryInput, LeadUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: LeadCreateOrConnectWithoutStatusHistoryInput
    connect?: LeadWhereUniqueInput
  }

  export type LeadUpdateOneRequiredWithoutStatusHistoryNestedInput = {
    create?: XOR<LeadCreateWithoutStatusHistoryInput, LeadUncheckedCreateWithoutStatusHistoryInput>
    connectOrCreate?: LeadCreateOrConnectWithoutStatusHistoryInput
    upsert?: LeadUpsertWithoutStatusHistoryInput
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutStatusHistoryInput, LeadUpdateWithoutStatusHistoryInput>, LeadUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type LeadCreateNestedOneWithoutDealsInput = {
    create?: XOR<LeadCreateWithoutDealsInput, LeadUncheckedCreateWithoutDealsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutDealsInput
    connect?: LeadWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LeadUpdateOneWithoutDealsNestedInput = {
    create?: XOR<LeadCreateWithoutDealsInput, LeadUncheckedCreateWithoutDealsInput>
    connectOrCreate?: LeadCreateOrConnectWithoutDealsInput
    upsert?: LeadUpsertWithoutDealsInput
    disconnect?: LeadWhereInput | boolean
    delete?: LeadWhereInput | boolean
    connect?: LeadWhereUniqueInput
    update?: XOR<XOR<LeadUpdateToOneWithWhereWithoutDealsInput, LeadUpdateWithoutDealsInput>, LeadUncheckedUpdateWithoutDealsInput>
  }

  export type AlertHistoryCreateNestedManyWithoutRuleInput = {
    create?: XOR<AlertHistoryCreateWithoutRuleInput, AlertHistoryUncheckedCreateWithoutRuleInput> | AlertHistoryCreateWithoutRuleInput[] | AlertHistoryUncheckedCreateWithoutRuleInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutRuleInput | AlertHistoryCreateOrConnectWithoutRuleInput[]
    createMany?: AlertHistoryCreateManyRuleInputEnvelope
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
  }

  export type AlertHistoryUncheckedCreateNestedManyWithoutRuleInput = {
    create?: XOR<AlertHistoryCreateWithoutRuleInput, AlertHistoryUncheckedCreateWithoutRuleInput> | AlertHistoryCreateWithoutRuleInput[] | AlertHistoryUncheckedCreateWithoutRuleInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutRuleInput | AlertHistoryCreateOrConnectWithoutRuleInput[]
    createMany?: AlertHistoryCreateManyRuleInputEnvelope
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
  }

  export type AlertHistoryUpdateManyWithoutRuleNestedInput = {
    create?: XOR<AlertHistoryCreateWithoutRuleInput, AlertHistoryUncheckedCreateWithoutRuleInput> | AlertHistoryCreateWithoutRuleInput[] | AlertHistoryUncheckedCreateWithoutRuleInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutRuleInput | AlertHistoryCreateOrConnectWithoutRuleInput[]
    upsert?: AlertHistoryUpsertWithWhereUniqueWithoutRuleInput | AlertHistoryUpsertWithWhereUniqueWithoutRuleInput[]
    createMany?: AlertHistoryCreateManyRuleInputEnvelope
    set?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    disconnect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    delete?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    update?: AlertHistoryUpdateWithWhereUniqueWithoutRuleInput | AlertHistoryUpdateWithWhereUniqueWithoutRuleInput[]
    updateMany?: AlertHistoryUpdateManyWithWhereWithoutRuleInput | AlertHistoryUpdateManyWithWhereWithoutRuleInput[]
    deleteMany?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
  }

  export type AlertHistoryUncheckedUpdateManyWithoutRuleNestedInput = {
    create?: XOR<AlertHistoryCreateWithoutRuleInput, AlertHistoryUncheckedCreateWithoutRuleInput> | AlertHistoryCreateWithoutRuleInput[] | AlertHistoryUncheckedCreateWithoutRuleInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutRuleInput | AlertHistoryCreateOrConnectWithoutRuleInput[]
    upsert?: AlertHistoryUpsertWithWhereUniqueWithoutRuleInput | AlertHistoryUpsertWithWhereUniqueWithoutRuleInput[]
    createMany?: AlertHistoryCreateManyRuleInputEnvelope
    set?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    disconnect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    delete?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    update?: AlertHistoryUpdateWithWhereUniqueWithoutRuleInput | AlertHistoryUpdateWithWhereUniqueWithoutRuleInput[]
    updateMany?: AlertHistoryUpdateManyWithWhereWithoutRuleInput | AlertHistoryUpdateManyWithWhereWithoutRuleInput[]
    deleteMany?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
  }

  export type AlertRuleCreateNestedOneWithoutHistoryInput = {
    create?: XOR<AlertRuleCreateWithoutHistoryInput, AlertRuleUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: AlertRuleCreateOrConnectWithoutHistoryInput
    connect?: AlertRuleWhereUniqueInput
  }

  export type AlertRuleUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<AlertRuleCreateWithoutHistoryInput, AlertRuleUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: AlertRuleCreateOrConnectWithoutHistoryInput
    upsert?: AlertRuleUpsertWithoutHistoryInput
    connect?: AlertRuleWhereUniqueInput
    update?: XOR<XOR<AlertRuleUpdateToOneWithWhereWithoutHistoryInput, AlertRuleUpdateWithoutHistoryInput>, AlertRuleUncheckedUpdateWithoutHistoryInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type LeadStatusEventCreateWithoutLeadInput = {
    id?: string
    fromStatus: string
    toStatus: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LeadStatusEventUncheckedCreateWithoutLeadInput = {
    id?: string
    fromStatus: string
    toStatus: string
    note?: string | null
    createdAt?: Date | string
  }

  export type LeadStatusEventCreateOrConnectWithoutLeadInput = {
    where: LeadStatusEventWhereUniqueInput
    create: XOR<LeadStatusEventCreateWithoutLeadInput, LeadStatusEventUncheckedCreateWithoutLeadInput>
  }

  export type LeadStatusEventCreateManyLeadInputEnvelope = {
    data: LeadStatusEventCreateManyLeadInput | LeadStatusEventCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type DealCreateWithoutLeadInput = {
    id?: string
    name: string
    value?: number
    status?: string
    expectedCloseAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealUncheckedCreateWithoutLeadInput = {
    id?: string
    name: string
    value?: number
    status?: string
    expectedCloseAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DealCreateOrConnectWithoutLeadInput = {
    where: DealWhereUniqueInput
    create: XOR<DealCreateWithoutLeadInput, DealUncheckedCreateWithoutLeadInput>
  }

  export type DealCreateManyLeadInputEnvelope = {
    data: DealCreateManyLeadInput | DealCreateManyLeadInput[]
    skipDuplicates?: boolean
  }

  export type LeadStatusEventUpsertWithWhereUniqueWithoutLeadInput = {
    where: LeadStatusEventWhereUniqueInput
    update: XOR<LeadStatusEventUpdateWithoutLeadInput, LeadStatusEventUncheckedUpdateWithoutLeadInput>
    create: XOR<LeadStatusEventCreateWithoutLeadInput, LeadStatusEventUncheckedCreateWithoutLeadInput>
  }

  export type LeadStatusEventUpdateWithWhereUniqueWithoutLeadInput = {
    where: LeadStatusEventWhereUniqueInput
    data: XOR<LeadStatusEventUpdateWithoutLeadInput, LeadStatusEventUncheckedUpdateWithoutLeadInput>
  }

  export type LeadStatusEventUpdateManyWithWhereWithoutLeadInput = {
    where: LeadStatusEventScalarWhereInput
    data: XOR<LeadStatusEventUpdateManyMutationInput, LeadStatusEventUncheckedUpdateManyWithoutLeadInput>
  }

  export type LeadStatusEventScalarWhereInput = {
    AND?: LeadStatusEventScalarWhereInput | LeadStatusEventScalarWhereInput[]
    OR?: LeadStatusEventScalarWhereInput[]
    NOT?: LeadStatusEventScalarWhereInput | LeadStatusEventScalarWhereInput[]
    id?: StringFilter<"LeadStatusEvent"> | string
    leadId?: StringFilter<"LeadStatusEvent"> | string
    fromStatus?: StringFilter<"LeadStatusEvent"> | string
    toStatus?: StringFilter<"LeadStatusEvent"> | string
    note?: StringNullableFilter<"LeadStatusEvent"> | string | null
    createdAt?: DateTimeFilter<"LeadStatusEvent"> | Date | string
  }

  export type DealUpsertWithWhereUniqueWithoutLeadInput = {
    where: DealWhereUniqueInput
    update: XOR<DealUpdateWithoutLeadInput, DealUncheckedUpdateWithoutLeadInput>
    create: XOR<DealCreateWithoutLeadInput, DealUncheckedCreateWithoutLeadInput>
  }

  export type DealUpdateWithWhereUniqueWithoutLeadInput = {
    where: DealWhereUniqueInput
    data: XOR<DealUpdateWithoutLeadInput, DealUncheckedUpdateWithoutLeadInput>
  }

  export type DealUpdateManyWithWhereWithoutLeadInput = {
    where: DealScalarWhereInput
    data: XOR<DealUpdateManyMutationInput, DealUncheckedUpdateManyWithoutLeadInput>
  }

  export type DealScalarWhereInput = {
    AND?: DealScalarWhereInput | DealScalarWhereInput[]
    OR?: DealScalarWhereInput[]
    NOT?: DealScalarWhereInput | DealScalarWhereInput[]
    id?: StringFilter<"Deal"> | string
    name?: StringFilter<"Deal"> | string
    value?: FloatFilter<"Deal"> | number
    status?: StringFilter<"Deal"> | string
    expectedCloseAt?: DateTimeNullableFilter<"Deal"> | Date | string | null
    leadId?: StringNullableFilter<"Deal"> | string | null
    notes?: StringNullableFilter<"Deal"> | string | null
    createdAt?: DateTimeFilter<"Deal"> | Date | string
    updatedAt?: DateTimeFilter<"Deal"> | Date | string
  }

  export type LeadCreateWithoutStatusHistoryInput = {
    id?: string
    name: string
    email: string
    company?: string | null
    phone?: string | null
    intent?: string | null
    notes?: string | null
    status?: string
    score?: number
    sourceUrl?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmTerm?: string | null
    utmContent?: string | null
    referrer?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutStatusHistoryInput = {
    id?: string
    name: string
    email: string
    company?: string | null
    phone?: string | null
    intent?: string | null
    notes?: string | null
    status?: string
    score?: number
    sourceUrl?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmTerm?: string | null
    utmContent?: string | null
    referrer?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deals?: DealUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutStatusHistoryInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutStatusHistoryInput, LeadUncheckedCreateWithoutStatusHistoryInput>
  }

  export type LeadUpsertWithoutStatusHistoryInput = {
    update: XOR<LeadUpdateWithoutStatusHistoryInput, LeadUncheckedUpdateWithoutStatusHistoryInput>
    create: XOR<LeadCreateWithoutStatusHistoryInput, LeadUncheckedCreateWithoutStatusHistoryInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutStatusHistoryInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutStatusHistoryInput, LeadUncheckedUpdateWithoutStatusHistoryInput>
  }

  export type LeadUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutStatusHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deals?: DealUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type LeadCreateWithoutDealsInput = {
    id?: string
    name: string
    email: string
    company?: string | null
    phone?: string | null
    intent?: string | null
    notes?: string | null
    status?: string
    score?: number
    sourceUrl?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmTerm?: string | null
    utmContent?: string | null
    referrer?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: LeadStatusEventCreateNestedManyWithoutLeadInput
  }

  export type LeadUncheckedCreateWithoutDealsInput = {
    id?: string
    name: string
    email: string
    company?: string | null
    phone?: string | null
    intent?: string | null
    notes?: string | null
    status?: string
    score?: number
    sourceUrl?: string | null
    utmSource?: string | null
    utmMedium?: string | null
    utmCampaign?: string | null
    utmTerm?: string | null
    utmContent?: string | null
    referrer?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    statusHistory?: LeadStatusEventUncheckedCreateNestedManyWithoutLeadInput
  }

  export type LeadCreateOrConnectWithoutDealsInput = {
    where: LeadWhereUniqueInput
    create: XOR<LeadCreateWithoutDealsInput, LeadUncheckedCreateWithoutDealsInput>
  }

  export type LeadUpsertWithoutDealsInput = {
    update: XOR<LeadUpdateWithoutDealsInput, LeadUncheckedUpdateWithoutDealsInput>
    create: XOR<LeadCreateWithoutDealsInput, LeadUncheckedCreateWithoutDealsInput>
    where?: LeadWhereInput
  }

  export type LeadUpdateToOneWithWhereWithoutDealsInput = {
    where?: LeadWhereInput
    data: XOR<LeadUpdateWithoutDealsInput, LeadUncheckedUpdateWithoutDealsInput>
  }

  export type LeadUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: LeadStatusEventUpdateManyWithoutLeadNestedInput
  }

  export type LeadUncheckedUpdateWithoutDealsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    utmSource?: NullableStringFieldUpdateOperationsInput | string | null
    utmMedium?: NullableStringFieldUpdateOperationsInput | string | null
    utmCampaign?: NullableStringFieldUpdateOperationsInput | string | null
    utmTerm?: NullableStringFieldUpdateOperationsInput | string | null
    utmContent?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    statusHistory?: LeadStatusEventUncheckedUpdateManyWithoutLeadNestedInput
  }

  export type AlertHistoryCreateWithoutRuleInput = {
    id?: string
    severity: string
    message: string
    source: string
    status?: string
    createdAt?: Date | string
  }

  export type AlertHistoryUncheckedCreateWithoutRuleInput = {
    id?: string
    severity: string
    message: string
    source: string
    status?: string
    createdAt?: Date | string
  }

  export type AlertHistoryCreateOrConnectWithoutRuleInput = {
    where: AlertHistoryWhereUniqueInput
    create: XOR<AlertHistoryCreateWithoutRuleInput, AlertHistoryUncheckedCreateWithoutRuleInput>
  }

  export type AlertHistoryCreateManyRuleInputEnvelope = {
    data: AlertHistoryCreateManyRuleInput | AlertHistoryCreateManyRuleInput[]
    skipDuplicates?: boolean
  }

  export type AlertHistoryUpsertWithWhereUniqueWithoutRuleInput = {
    where: AlertHistoryWhereUniqueInput
    update: XOR<AlertHistoryUpdateWithoutRuleInput, AlertHistoryUncheckedUpdateWithoutRuleInput>
    create: XOR<AlertHistoryCreateWithoutRuleInput, AlertHistoryUncheckedCreateWithoutRuleInput>
  }

  export type AlertHistoryUpdateWithWhereUniqueWithoutRuleInput = {
    where: AlertHistoryWhereUniqueInput
    data: XOR<AlertHistoryUpdateWithoutRuleInput, AlertHistoryUncheckedUpdateWithoutRuleInput>
  }

  export type AlertHistoryUpdateManyWithWhereWithoutRuleInput = {
    where: AlertHistoryScalarWhereInput
    data: XOR<AlertHistoryUpdateManyMutationInput, AlertHistoryUncheckedUpdateManyWithoutRuleInput>
  }

  export type AlertHistoryScalarWhereInput = {
    AND?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
    OR?: AlertHistoryScalarWhereInput[]
    NOT?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
    id?: StringFilter<"AlertHistory"> | string
    ruleId?: StringFilter<"AlertHistory"> | string
    severity?: StringFilter<"AlertHistory"> | string
    message?: StringFilter<"AlertHistory"> | string
    source?: StringFilter<"AlertHistory"> | string
    status?: StringFilter<"AlertHistory"> | string
    createdAt?: DateTimeFilter<"AlertHistory"> | Date | string
  }

  export type AlertRuleCreateWithoutHistoryInput = {
    id?: string
    type: string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    cooldownMinutes?: number
    lastTriggeredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlertRuleUncheckedCreateWithoutHistoryInput = {
    id?: string
    type: string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: boolean
    cooldownMinutes?: number
    lastTriggeredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AlertRuleCreateOrConnectWithoutHistoryInput = {
    where: AlertRuleWhereUniqueInput
    create: XOR<AlertRuleCreateWithoutHistoryInput, AlertRuleUncheckedCreateWithoutHistoryInput>
  }

  export type AlertRuleUpsertWithoutHistoryInput = {
    update: XOR<AlertRuleUpdateWithoutHistoryInput, AlertRuleUncheckedUpdateWithoutHistoryInput>
    create: XOR<AlertRuleCreateWithoutHistoryInput, AlertRuleUncheckedCreateWithoutHistoryInput>
    where?: AlertRuleWhereInput
  }

  export type AlertRuleUpdateToOneWithWhereWithoutHistoryInput = {
    where?: AlertRuleWhereInput
    data: XOR<AlertRuleUpdateWithoutHistoryInput, AlertRuleUncheckedUpdateWithoutHistoryInput>
  }

  export type AlertRuleUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    cooldownMinutes?: IntFieldUpdateOperationsInput | number
    lastTriggeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertRuleUncheckedUpdateWithoutHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    threshold?: NullableJsonNullValueInput | InputJsonValue
    enabled?: BoolFieldUpdateOperationsInput | boolean
    cooldownMinutes?: IntFieldUpdateOperationsInput | number
    lastTriggeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadStatusEventCreateManyLeadInput = {
    id?: string
    fromStatus: string
    toStatus: string
    note?: string | null
    createdAt?: Date | string
  }

  export type DealCreateManyLeadInput = {
    id?: string
    name: string
    value?: number
    status?: string
    expectedCloseAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeadStatusEventUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: StringFieldUpdateOperationsInput | string
    toStatus?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadStatusEventUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: StringFieldUpdateOperationsInput | string
    toStatus?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeadStatusEventUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    fromStatus?: StringFieldUpdateOperationsInput | string
    toStatus?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    expectedCloseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealUncheckedUpdateWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    expectedCloseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DealUncheckedUpdateManyWithoutLeadInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    expectedCloseAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertHistoryCreateManyRuleInput = {
    id?: string
    severity: string
    message: string
    source: string
    status?: string
    createdAt?: Date | string
  }

  export type AlertHistoryUpdateWithoutRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertHistoryUncheckedUpdateWithoutRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertHistoryUncheckedUpdateManyWithoutRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}