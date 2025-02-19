import { relations } from "drizzle-orm/relations";
import {
  usersInAuth,
  profiles,
  sessionsInAuth,
  refreshTokensInAuth,
  mfaFactorsInAuth,
  mfaChallengesInAuth,
  ssoProvidersInAuth,
  ssoDomainsInAuth,
  mfaAmrClaimsInAuth,
  samlRelayStatesInAuth,
  flowStateInAuth,
  samlProvidersInAuth,
  identitiesInAuth,
  oneTimeTokensInAuth,
} from "./schema";

export const profilesRelations = relations(profiles, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [profiles.userId],
    references: [usersInAuth.id],
  }),
}));

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  profiles: many(profiles),
  mfaFactorsInAuths: many(mfaFactorsInAuth),
  sessionsInAuths: many(sessionsInAuth),
  identitiesInAuths: many(identitiesInAuth),
  oneTimeTokensInAuths: many(oneTimeTokensInAuth),
}));

export const refreshTokensInAuthRelations = relations(
  refreshTokensInAuth,
  ({ one }) => ({
    sessionsInAuth: one(sessionsInAuth, {
      fields: [refreshTokensInAuth.sessionId],
      references: [sessionsInAuth.id],
    }),
  }),
);

export const sessionsInAuthRelations = relations(
  sessionsInAuth,
  ({ one, many }) => ({
    refreshTokensInAuths: many(refreshTokensInAuth),
    usersInAuth: one(usersInAuth, {
      fields: [sessionsInAuth.userId],
      references: [usersInAuth.id],
    }),
    mfaAmrClaimsInAuths: many(mfaAmrClaimsInAuth),
  }),
);

export const mfaFactorsInAuthRelations = relations(
  mfaFactorsInAuth,
  ({ one, many }) => ({
    usersInAuth: one(usersInAuth, {
      fields: [mfaFactorsInAuth.userId],
      references: [usersInAuth.id],
    }),
    mfaChallengesInAuths: many(mfaChallengesInAuth),
  }),
);

export const mfaChallengesInAuthRelations = relations(
  mfaChallengesInAuth,
  ({ one }) => ({
    mfaFactorsInAuth: one(mfaFactorsInAuth, {
      fields: [mfaChallengesInAuth.factorId],
      references: [mfaFactorsInAuth.id],
    }),
  }),
);

export const ssoDomainsInAuthRelations = relations(
  ssoDomainsInAuth,
  ({ one }) => ({
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      fields: [ssoDomainsInAuth.ssoProviderId],
      references: [ssoProvidersInAuth.id],
    }),
  }),
);

export const ssoProvidersInAuthRelations = relations(
  ssoProvidersInAuth,
  ({ many }) => ({
    ssoDomainsInAuths: many(ssoDomainsInAuth),
    samlRelayStatesInAuths: many(samlRelayStatesInAuth),
    samlProvidersInAuths: many(samlProvidersInAuth),
  }),
);

export const mfaAmrClaimsInAuthRelations = relations(
  mfaAmrClaimsInAuth,
  ({ one }) => ({
    sessionsInAuth: one(sessionsInAuth, {
      fields: [mfaAmrClaimsInAuth.sessionId],
      references: [sessionsInAuth.id],
    }),
  }),
);

export const samlRelayStatesInAuthRelations = relations(
  samlRelayStatesInAuth,
  ({ one }) => ({
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      fields: [samlRelayStatesInAuth.ssoProviderId],
      references: [ssoProvidersInAuth.id],
    }),
    flowStateInAuth: one(flowStateInAuth, {
      fields: [samlRelayStatesInAuth.flowStateId],
      references: [flowStateInAuth.id],
    }),
  }),
);

export const flowStateInAuthRelations = relations(
  flowStateInAuth,
  ({ many }) => ({
    samlRelayStatesInAuths: many(samlRelayStatesInAuth),
  }),
);

export const samlProvidersInAuthRelations = relations(
  samlProvidersInAuth,
  ({ one }) => ({
    ssoProvidersInAuth: one(ssoProvidersInAuth, {
      fields: [samlProvidersInAuth.ssoProviderId],
      references: [ssoProvidersInAuth.id],
    }),
  }),
);

export const identitiesInAuthRelations = relations(
  identitiesInAuth,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      fields: [identitiesInAuth.userId],
      references: [usersInAuth.id],
    }),
  }),
);

export const oneTimeTokensInAuthRelations = relations(
  oneTimeTokensInAuth,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      fields: [oneTimeTokensInAuth.userId],
      references: [usersInAuth.id],
    }),
  }),
);
