import { zip } from 'ramda'
import { teamRating, score, ladderPairs } from '../util'
import { BETASQ, EPSILON } from '../constants'

const TWOBETASQ = 2 * BETASQ

export default (game, _options) => {
  const teamRatings = teamRating(game)
  const adjacentTeams = ladderPairs(teamRatings)
  return zip(teamRatings, adjacentTeams).map(([iTeamRating, iAdjacent]) => {
    const [iMu, iSigmaSq, iTeam, iRank] = iTeamRating
    const [iOmega, iDelta] = iAdjacent
      .filter(([_qMu, _qSigmaSq, _qTeam, qRank]) => qRank !== iRank)
      .reduce(
        ([omega, delta], [qMu, qSigmaSq, _qTeam, qRank]) => {
          const ciq = Math.sqrt(iSigmaSq + qSigmaSq + TWOBETASQ)
          const piq = 1 / (1 + Math.exp((qMu - iMu) / ciq))
          const sigSqToCiq = iSigmaSq / ciq
          const gamma = Math.sqrt(iSigmaSq) / ciq

          return [
            omega + sigSqToCiq * (score(qRank, iRank) - piq),
            delta + ((gamma * sigSqToCiq) / ciq) * piq * (1 - piq),
          ]
        },
        [0, 0]
      )
    return iTeam.map(({ mu, sigma }) => {
      const sigmaSq = sigma * sigma
      return {
        mu: mu + (sigmaSq / iSigmaSq) * iOmega,
        sigma:
          sigma *
          Math.sqrt(Math.max(1 - (sigmaSq / iSigmaSq) * iDelta, EPSILON)),
      }
    })
  })
}
