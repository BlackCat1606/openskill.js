import { rate as rateStub, rating } from '../..'

const rate = (game) => rateStub(game, { model: 'thurstonMostellerPart' })

describe('thurstonMostellerPart', () => {
  const r = rating()
  const team1 = [r]
  const team2 = [r, r]
  const team3 = [r, r, r]

  it('solo game does not change rating', () => {
    expect.assertions(1)
    expect(rate([team1])).toStrictEqual([team1])
  })

  it('2p FFA', () => {
    expect.assertions(1)
    expect(rate([team1, team1])).toStrictEqual([
      [{ mu: 29.20524620886059, sigma: 7.632833464033909 }],
      [{ mu: 20.79475379113941, sigma: 7.632833464033909 }],
    ])
  })

  it('3p FFA', () => {
    expect.assertions(1)
    expect(rate([team1, team1, team1])).toStrictEqual([
      [{ mu: 29.20524620886059, sigma: 7.632833464033909 }],
      [{ mu: 25, sigma: 6.861184222487201 }],
      [{ mu: 20.79475379113941, sigma: 7.632833464033909 }],
    ])
  })

  it('4p FFA', () => {
    expect.assertions(1)
    expect(rate([team1, team1, team1, team1])).toStrictEqual([
      [{ mu: 29.20524620886059, sigma: 7.632833464033909 }],
      [{ mu: 25, sigma: 6.861184222487201 }],
      [{ mu: 25, sigma: 6.861184222487201 }],
      [{ mu: 20.79475379113941, sigma: 7.632833464033909 }],
    ])
  })

  it('5p FFA', () => {
    expect.assertions(1)
    expect(rate([team1, team1, team1, team1, team1])).toStrictEqual([
      [{ mu: 29.20524620886059, sigma: 7.632833464033909 }],
      [{ mu: 25, sigma: 6.861184222487201 }],
      [{ mu: 25, sigma: 6.861184222487201 }],
      [{ mu: 25, sigma: 6.861184222487201 }],
      [{ mu: 20.79475379113941, sigma: 7.632833464033909 }],
    ])
  })

  it('3 teams different sized players', () => {
    expect.assertions(1)
    expect(rate([team3, team1, team2])).toStrictEqual([
      [
        { mu: 25.028771900446664, sigma: 8.317616549882494 },
        { mu: 25.028771900446664, sigma: 8.317616549882494 },
        { mu: 25.028771900446664, sigma: 8.317616549882494 },
      ],
      [{ mu: 34.0010841338675, sigma: 7.7579369709569805 }],
      [
        { mu: 15.970143965685834, sigma: 7.520912043634571 },
        { mu: 15.970143965685834, sigma: 7.520912043634571 },
      ],
    ])
  })
})
