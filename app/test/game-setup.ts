import { MapSchema } from "@colyseus/schema"
import { Pokemon } from "../models/colyseus-models/pokemon"
import { nanoid } from "nanoid"
import { IPokemonConfig } from "../models/mongo-models/user-metadata"
import GameState from "../rooms/states/game-state"
import { Title, Role } from "../types"
import Player from "../models/colyseus-models/player"
import { Team } from "../types/enum/Game"

export function createUnit(
  pokemonCtor: new (...args: any[]) => Pokemon,
  x: number,
  y: number
): Pokemon {
  const unit = new pokemonCtor()
  unit.positionX = x
  unit.positionY = y
  return unit
}

export function createBoard(...pokemons: Pokemon[]): MapSchema<Pokemon> {
  return new MapSchema(new Map(pokemons.map((pokemon) => [nanoid(), pokemon])))
}

export function createPlayer(
  {
    id = nanoid(),
    name = id,
    elo = 1000,
    avatar = "0001/Normal",
    isBot = false,
    rank = 1,
    pokemonCollection = new Map(),
    title = "",
    role = Role.BASIC
  }: {
    id?: string
    name?: string
    elo?: number
    avatar?: string
    isBot?: boolean
    rank?: number
    pokemonCollection?: Map<string, IPokemonConfig>
    title?: Title | ""
    role?: Role
  },
  state: GameState,
  team: Team,
  board: MapSchema<Pokemon> = new MapSchema()
) {
  const player = new Player(
    name,
    name,
    elo,
    avatar,
    isBot,
    rank,
    pokemonCollection,
    title,
    role,
    state
  )
  player.board = board
  player.team = team

  return player
}
