class ContractStatus < ApplicationRecord

  enum phase: { presale: 0, postsale: 1, listing: 2, staking: 3, marketing: 4 }

  PHASES = { presale: 0, postsale: 1, listing: 2, staking: 3, marketing: 4 }
end
