export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      account: {
        Row: {
          gameName: string
          puuid: string
          tagLine: string
        }
        Insert: {
          gameName: string
          puuid: string
          tagLine: string
        }
        Update: {
          gameName?: string
          puuid?: string
          tagLine?: string
        }
        Relationships: []
      }
      friendship: {
        Row: {
          created_at: string
          receiver_user_id: string
          sender_user_id: string
          status: string | null
        }
        Insert: {
          created_at?: string
          receiver_user_id: string
          sender_user_id?: string
          status?: string | null
        }
        Update: {
          created_at?: string
          receiver_user_id?: string
          sender_user_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friendship_receiver_user_id_fkey"
            columns: ["receiver_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendship_sender_user_id_fkey"
            columns: ["sender_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      league: {
        Row: {
          created_at: string
          freshBlood: boolean
          hotStreak: boolean
          inactive: boolean
          leagueId: string
          leaguePoints: number
          losses: number
          miniSeries: Json | null
          queueType: string
          rank: string
          region: string
          summonerId: string
          summonerName: string
          tier: string
          veteran: boolean
          wins: number
        }
        Insert: {
          created_at?: string
          freshBlood: boolean
          hotStreak: boolean
          inactive: boolean
          leagueId: string
          leaguePoints: number
          losses: number
          miniSeries?: Json | null
          queueType: string
          rank: string
          region: string
          summonerId: string
          summonerName: string
          tier: string
          veteran: boolean
          wins: number
        }
        Update: {
          created_at?: string
          freshBlood?: boolean
          hotStreak?: boolean
          inactive?: boolean
          leagueId?: string
          leaguePoints?: number
          losses?: number
          miniSeries?: Json | null
          queueType?: string
          rank?: string
          region?: string
          summonerId?: string
          summonerName?: string
          tier?: string
          veteran?: boolean
          wins?: number
        }
        Relationships: []
      }
      match: {
        Row: {
          created_at: string
          match_data: Json
          match_id: string
        }
        Insert: {
          created_at?: string
          match_data: Json
          match_id: string
        }
        Update: {
          created_at?: string
          match_data?: Json
          match_id?: string
        }
        Relationships: []
      }
      participant: {
        Row: {
          allInPings: number | null
          assistMePings: number | null
          assists: number | null
          baitPings: number | null
          baronKills: number | null
          basicPings: number | null
          bountyLevel: number | null
          challenges: Json | null
          champExperience: number | null
          championId: number | null
          championName: string | null
          championTransform: number | null
          champLevel: number | null
          commandPings: number | null
          consumablesPurchased: number | null
          created_at: string
          damageDealtToBuildings: number | null
          damageDealtToObjectives: number | null
          damageDealtToTurrets: number | null
          damageSelfMitigated: number | null
          dangerPings: number | null
          deaths: number | null
          detectorWardsPlaced: number | null
          doubleKills: number | null
          dragonKills: number | null
          eligibleForProgression: boolean | null
          enemyMissingPings: number | null
          enemyVisionPings: number | null
          firstBloodAssist: boolean | null
          firstBloodKill: boolean | null
          firstTowerAssist: boolean | null
          firstTowerKill: boolean | null
          gameEndedInEarlySurrender: boolean | null
          gameEndedInSurrender: boolean | null
          getBackPings: number | null
          goldEarned: number | null
          goldSpent: number | null
          holdPings: number | null
          individualPosition: string | null
          inhibitorKills: number | null
          inhibitorsLost: number | null
          inhibitorTakedowns: number | null
          item0: number | null
          item1: number | null
          item2: number | null
          item3: number | null
          item4: number | null
          item5: number | null
          item6: number | null
          itemsPurchased: number | null
          killingSprees: number | null
          kills: number | null
          lane: string | null
          largestCriticalStrike: number | null
          largestKillingSpree: number | null
          largestMultiKill: number | null
          longestTimeSpentLiving: number | null
          magicDamageDealt: number | null
          magicDamageDealtToChampions: number | null
          magicDamageTaken: number | null
          match_id: string
          needVisionPings: number | null
          neutralMinionsKilled: number | null
          nexusKills: number | null
          nexusLost: number | null
          nexusTakedowns: number | null
          objectivesStolen: number | null
          objectivesStolenAssists: number | null
          onMyWayPings: number | null
          participantId: number | null
          pentaKills: number | null
          perks: Json | null
          physicalDamageDealt: number | null
          physicalDamageDealtToChampions: number | null
          physicalDamageTaken: number | null
          placement: number | null
          playerAugment1: number | null
          playerAugment2: number | null
          playerAugment3: number | null
          playerAugment4: number | null
          playerSubteamId: number | null
          profileIcon: number | null
          pushPings: number | null
          puuid: string
          quadraKills: number | null
          riotIdName: string | null
          riotIdTagline: string | null
          role: string | null
          sightWardsBoughtInGame: number | null
          spell1Casts: number | null
          spell2Casts: number | null
          spell3Casts: number | null
          spell4Casts: number | null
          subteamPlacement: number | null
          summoner1Casts: number | null
          summoner1Id: number | null
          summoner2Casts: number | null
          summoner2Id: number | null
          summonerId: string
          summonerLevel: number | null
          summonerName: string | null
          teamEarlySurrendered: boolean | null
          teamId: number | null
          teamPosition: string | null
          timeCCingOthers: number | null
          timePlayed: number | null
          totalAllyJungleMinionsKilled: number | null
          totalDamageDealt: number | null
          totalDamageDealtToChampions: number | null
          totalDamageShieldedOnTeammates: number | null
          totalDamageTaken: number | null
          totalEnemyJungleMinionsKilled: number | null
          totalHeal: number | null
          totalHealsOnTeammates: number | null
          totalMinionsKilled: number | null
          totalTimeCCDealt: number | null
          totalTimeSpentDead: number | null
          totalUnitsHealed: number | null
          tripleKills: number | null
          trueDamageDealt: number | null
          trueDamageDealtToChampions: number | null
          trueDamageTaken: number | null
          turretKills: number | null
          turretsLost: number | null
          turretTakedowns: number | null
          unrealKills: number | null
          visionClearedPings: number | null
          visionScore: number | null
          visionWardsBoughtInGame: number | null
          wardsKilled: number | null
          wardsPlaced: number | null
          win: boolean | null
        }
        Insert: {
          allInPings?: number | null
          assistMePings?: number | null
          assists?: number | null
          baitPings?: number | null
          baronKills?: number | null
          basicPings?: number | null
          bountyLevel?: number | null
          challenges?: Json | null
          champExperience?: number | null
          championId?: number | null
          championName?: string | null
          championTransform?: number | null
          champLevel?: number | null
          commandPings?: number | null
          consumablesPurchased?: number | null
          created_at?: string
          damageDealtToBuildings?: number | null
          damageDealtToObjectives?: number | null
          damageDealtToTurrets?: number | null
          damageSelfMitigated?: number | null
          dangerPings?: number | null
          deaths?: number | null
          detectorWardsPlaced?: number | null
          doubleKills?: number | null
          dragonKills?: number | null
          eligibleForProgression?: boolean | null
          enemyMissingPings?: number | null
          enemyVisionPings?: number | null
          firstBloodAssist?: boolean | null
          firstBloodKill?: boolean | null
          firstTowerAssist?: boolean | null
          firstTowerKill?: boolean | null
          gameEndedInEarlySurrender?: boolean | null
          gameEndedInSurrender?: boolean | null
          getBackPings?: number | null
          goldEarned?: number | null
          goldSpent?: number | null
          holdPings?: number | null
          individualPosition?: string | null
          inhibitorKills?: number | null
          inhibitorsLost?: number | null
          inhibitorTakedowns?: number | null
          item0?: number | null
          item1?: number | null
          item2?: number | null
          item3?: number | null
          item4?: number | null
          item5?: number | null
          item6?: number | null
          itemsPurchased?: number | null
          killingSprees?: number | null
          kills?: number | null
          lane?: string | null
          largestCriticalStrike?: number | null
          largestKillingSpree?: number | null
          largestMultiKill?: number | null
          longestTimeSpentLiving?: number | null
          magicDamageDealt?: number | null
          magicDamageDealtToChampions?: number | null
          magicDamageTaken?: number | null
          match_id: string
          needVisionPings?: number | null
          neutralMinionsKilled?: number | null
          nexusKills?: number | null
          nexusLost?: number | null
          nexusTakedowns?: number | null
          objectivesStolen?: number | null
          objectivesStolenAssists?: number | null
          onMyWayPings?: number | null
          participantId?: number | null
          pentaKills?: number | null
          perks?: Json | null
          physicalDamageDealt?: number | null
          physicalDamageDealtToChampions?: number | null
          physicalDamageTaken?: number | null
          placement?: number | null
          playerAugment1?: number | null
          playerAugment2?: number | null
          playerAugment3?: number | null
          playerAugment4?: number | null
          playerSubteamId?: number | null
          profileIcon?: number | null
          pushPings?: number | null
          puuid: string
          quadraKills?: number | null
          riotIdName?: string | null
          riotIdTagline?: string | null
          role?: string | null
          sightWardsBoughtInGame?: number | null
          spell1Casts?: number | null
          spell2Casts?: number | null
          spell3Casts?: number | null
          spell4Casts?: number | null
          subteamPlacement?: number | null
          summoner1Casts?: number | null
          summoner1Id?: number | null
          summoner2Casts?: number | null
          summoner2Id?: number | null
          summonerId: string
          summonerLevel?: number | null
          summonerName?: string | null
          teamEarlySurrendered?: boolean | null
          teamId?: number | null
          teamPosition?: string | null
          timeCCingOthers?: number | null
          timePlayed?: number | null
          totalAllyJungleMinionsKilled?: number | null
          totalDamageDealt?: number | null
          totalDamageDealtToChampions?: number | null
          totalDamageShieldedOnTeammates?: number | null
          totalDamageTaken?: number | null
          totalEnemyJungleMinionsKilled?: number | null
          totalHeal?: number | null
          totalHealsOnTeammates?: number | null
          totalMinionsKilled?: number | null
          totalTimeCCDealt?: number | null
          totalTimeSpentDead?: number | null
          totalUnitsHealed?: number | null
          tripleKills?: number | null
          trueDamageDealt?: number | null
          trueDamageDealtToChampions?: number | null
          trueDamageTaken?: number | null
          turretKills?: number | null
          turretsLost?: number | null
          turretTakedowns?: number | null
          unrealKills?: number | null
          visionClearedPings?: number | null
          visionScore?: number | null
          visionWardsBoughtInGame?: number | null
          wardsKilled?: number | null
          wardsPlaced?: number | null
          win?: boolean | null
        }
        Update: {
          allInPings?: number | null
          assistMePings?: number | null
          assists?: number | null
          baitPings?: number | null
          baronKills?: number | null
          basicPings?: number | null
          bountyLevel?: number | null
          challenges?: Json | null
          champExperience?: number | null
          championId?: number | null
          championName?: string | null
          championTransform?: number | null
          champLevel?: number | null
          commandPings?: number | null
          consumablesPurchased?: number | null
          created_at?: string
          damageDealtToBuildings?: number | null
          damageDealtToObjectives?: number | null
          damageDealtToTurrets?: number | null
          damageSelfMitigated?: number | null
          dangerPings?: number | null
          deaths?: number | null
          detectorWardsPlaced?: number | null
          doubleKills?: number | null
          dragonKills?: number | null
          eligibleForProgression?: boolean | null
          enemyMissingPings?: number | null
          enemyVisionPings?: number | null
          firstBloodAssist?: boolean | null
          firstBloodKill?: boolean | null
          firstTowerAssist?: boolean | null
          firstTowerKill?: boolean | null
          gameEndedInEarlySurrender?: boolean | null
          gameEndedInSurrender?: boolean | null
          getBackPings?: number | null
          goldEarned?: number | null
          goldSpent?: number | null
          holdPings?: number | null
          individualPosition?: string | null
          inhibitorKills?: number | null
          inhibitorsLost?: number | null
          inhibitorTakedowns?: number | null
          item0?: number | null
          item1?: number | null
          item2?: number | null
          item3?: number | null
          item4?: number | null
          item5?: number | null
          item6?: number | null
          itemsPurchased?: number | null
          killingSprees?: number | null
          kills?: number | null
          lane?: string | null
          largestCriticalStrike?: number | null
          largestKillingSpree?: number | null
          largestMultiKill?: number | null
          longestTimeSpentLiving?: number | null
          magicDamageDealt?: number | null
          magicDamageDealtToChampions?: number | null
          magicDamageTaken?: number | null
          match_id?: string
          needVisionPings?: number | null
          neutralMinionsKilled?: number | null
          nexusKills?: number | null
          nexusLost?: number | null
          nexusTakedowns?: number | null
          objectivesStolen?: number | null
          objectivesStolenAssists?: number | null
          onMyWayPings?: number | null
          participantId?: number | null
          pentaKills?: number | null
          perks?: Json | null
          physicalDamageDealt?: number | null
          physicalDamageDealtToChampions?: number | null
          physicalDamageTaken?: number | null
          placement?: number | null
          playerAugment1?: number | null
          playerAugment2?: number | null
          playerAugment3?: number | null
          playerAugment4?: number | null
          playerSubteamId?: number | null
          profileIcon?: number | null
          pushPings?: number | null
          puuid?: string
          quadraKills?: number | null
          riotIdName?: string | null
          riotIdTagline?: string | null
          role?: string | null
          sightWardsBoughtInGame?: number | null
          spell1Casts?: number | null
          spell2Casts?: number | null
          spell3Casts?: number | null
          spell4Casts?: number | null
          subteamPlacement?: number | null
          summoner1Casts?: number | null
          summoner1Id?: number | null
          summoner2Casts?: number | null
          summoner2Id?: number | null
          summonerId?: string
          summonerLevel?: number | null
          summonerName?: string | null
          teamEarlySurrendered?: boolean | null
          teamId?: number | null
          teamPosition?: string | null
          timeCCingOthers?: number | null
          timePlayed?: number | null
          totalAllyJungleMinionsKilled?: number | null
          totalDamageDealt?: number | null
          totalDamageDealtToChampions?: number | null
          totalDamageShieldedOnTeammates?: number | null
          totalDamageTaken?: number | null
          totalEnemyJungleMinionsKilled?: number | null
          totalHeal?: number | null
          totalHealsOnTeammates?: number | null
          totalMinionsKilled?: number | null
          totalTimeCCDealt?: number | null
          totalTimeSpentDead?: number | null
          totalUnitsHealed?: number | null
          tripleKills?: number | null
          trueDamageDealt?: number | null
          trueDamageDealtToChampions?: number | null
          trueDamageTaken?: number | null
          turretKills?: number | null
          turretsLost?: number | null
          turretTakedowns?: number | null
          unrealKills?: number | null
          visionClearedPings?: number | null
          visionScore?: number | null
          visionWardsBoughtInGame?: number | null
          wardsKilled?: number | null
          wardsPlaced?: number | null
          win?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "participant_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["match_id"]
          }
        ]
      }
      profile: {
        Row: {
          email: string | null
          id: string
          name: string | null
          puuid: string | null
        }
        Insert: {
          email?: string | null
          id: string
          name?: string | null
          puuid?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string | null
          puuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      summoner: {
        Row: {
          accountId: string
          id: string
          name: string
          profileIconId: number
          puuid: string
          region: string
          revisionDate: number
          summonerLevel: number
          user_id: string | null
        }
        Insert: {
          accountId: string
          id: string
          name: string
          profileIconId: number
          puuid: string
          region: string
          revisionDate: number
          summonerLevel: number
          user_id?: string | null
        }
        Update: {
          accountId?: string
          id?: string
          name?: string
          profileIconId?: number
          puuid?: string
          region?: string
          revisionDate?: number
          summonerLevel?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "summoner_puuid_fkey"
            columns: ["puuid"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["puuid"]
          },
          {
            foreignKeyName: "summoner_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
