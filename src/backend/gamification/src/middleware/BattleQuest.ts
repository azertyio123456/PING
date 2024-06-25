// src/middleware/BattleLogic.ts
import { fetchAllUsers, fetchUserPokemon } from '../services/UserServices';

interface BattleLog
{
    turn: number;
    pokemon1:
    {
        name: string;
        hp: number;
        attack: boolean;
    };
    pokemon2:
    {
        name: string;
        hp: number;
        attack: boolean;
    };
}

export class BattleLogic
{
    static async retrieveAllUsersAndPokemon()
    {
        const users = await fetchAllUsers();
        const usersWithPokemon = await Promise.all(users.map(async (user: any) =>
        {
            const pokemon = await fetchUserPokemon(user.username);
            return { user, pokemon };
        }));
        return usersWithPokemon;
    }

    static simulateBattle(pokemon1: any, pokemon2: any): { winner: string; battleLog: BattleLog[] }
    {
        let battleLog: BattleLog[] = [];
        let turn = 1;
        console.log("pokemon1.gamification.hp");
        console.log(pokemon1.userInfo.gamification.hp);

        while (pokemon1.userInfo.gamification.hp > 0 && pokemon2.userInfo.gamification.hp > 0)
        {
            console.log(turn);
            const attack1 = Math.random() < pokemon1.userInfo.gamification.competences.random / 100;
            const attack2 = Math.random() < pokemon2.userInfo.gamification.competences.random / 100;

            if (attack1)
            {
                pokemon2.userInfo.gamification.hp -= pokemon1.userInfo.gamification.competences.attack;
            }

            if (attack2)
            {
                pokemon1.userInfo.gamification.hp -= pokemon2.userInfo.gamification.competences.attack;
            }

            battleLog.push(
            {
                turn,
                pokemon1:
                {
                    name: pokemon1.userInfo.username,
                    hp: pokemon1.userInfo.gamification.hp,
                    attack: attack1
                },
                pokemon2:
                {
                    name: pokemon2.userInfo.username,
                    hp: pokemon2.userInfo.gamification.hp,
                    attack: attack2
                }
            });

            turn++;
        }

        const winner = pokemon1.userInfo.gamification.hp > 0 ? pokemon1.userInfo.username : pokemon2.userInfo.username;

        return { winner, battleLog };
    }

    static async runTournament()
    {
        const usersWithPokemon = await this.retrieveAllUsersAndPokemon();
        console.log(usersWithPokemon);
        // Trier les utilisateurs par nombre de victoires
        usersWithPokemon.sort((a: any, b: any) =>
        {
            const victoriesA = (a.user.gamification.victoire_defaite || []).filter((v: boolean) => v).length;
            const victoriesB = (b.user.gamification.victoire_defaite || []).filter((v: boolean) => v).length;
            return victoriesB - victoriesA;
        });
        console.log(usersWithPokemon);

        let results: any[] = [];

        // Organiser les batailles en groupes
        for (let i = 0; i < usersWithPokemon.length - 1; i += 2)
        {
            if (i + 1 < usersWithPokemon.length)
            {
                const user1 = usersWithPokemon[i];
                const user2 = usersWithPokemon[i + 1];

                console.log("battle  n = " +  i +" " + user1.pokemon + " "+user2.pokemon);
                const battleResult = this.simulateBattle(user1.pokemon, user2.pokemon);
                results.push({
                    user1: user1.user.username,
                    user2: user2.user.username,
                    winner: battleResult.winner,
                    battleLog: battleResult.battleLog
                });
            }
        }

        return results;
    }
}
