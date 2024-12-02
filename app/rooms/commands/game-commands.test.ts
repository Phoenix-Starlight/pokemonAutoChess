import assert from "node:assert/strict";
import { describe, it } from "node:test";
import Simulation from "../../core/simulation"
import { Comfey, Pikachu, Rattata } from "../../models/colyseus-models/pokemon";
import { MapSchema } from "@colyseus/schema";
import Player from "../../models/colyseus-models/player";
import { Weather } from "../../types/enum/Weather";
import { Role } from "../../types";
import GameState from "../states/game-state";
import { GameMode, Team } from "../../types/enum/Game";
import GameRoom from "../game-room";
import { Item } from "../../types/enum/Item";
import { createBoard, createPlayer, createUnit } from "../../test/game-setup";


describe('comfey attaches in non-ghost battle', () => {
    it('attaches', () => {
        const gameState = new GameState("", "", true, GameMode.QUICKPLAY, null, null, null)
        
        const comfey = createUnit(Comfey, 1, 2)

        const pikachu = createUnit(Pikachu, 1, 1)

        const rattata = createUnit(Rattata, 1, 1)

        const comfeyBoard = createBoard(comfey, pikachu)

        const ratBoard = createBoard(rattata)

        const dummy = createPlayer({ rank: 2 }, gameState, Team.BLUE_TEAM, ratBoard)
        const curry = createPlayer({ name: "Curry", rank: 1 }, gameState, Team.RED_TEAM, comfeyBoard)

    
        const sim = new Simulation(
            "",
            null as unknown as GameRoom,
            ratBoard,
            comfeyBoard,
            dummy,
            curry,
            5,
            Weather.NEUTRAL,
            true
        )
        
        const isComfeyAttached = sim.board.find((_x, _y, pokemon) => pokemon.refToBoardPokemon instanceof Pikachu)?.items.has(Item.COMFEY)

        assert.ok(isComfeyAttached, "Comfey is not attached")
    })
})