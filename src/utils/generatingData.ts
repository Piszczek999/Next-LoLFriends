import { CHAMPIONS, ITEMS, SUMMONERS } from "./LoL-data";

const URL =
  "https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/";

type Item = {
  id: string;
  name: string;
  description: string;
  plaintext: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

type Champion = {
  id: string;
  key: number;
  name: string;
  title: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

type Spell = {
  id: string;
  key: string;
  name: string;
  description: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

export async function getItemsData() {
  const stringify = (items: Item[]) => {
    return `
    [${items.map(
      (item) => `
      {
        id:"${item.id}",
        name:"${item.name}",
        description: "${item.description.replace(/"/g, '\\"')}",
        plaintext: "${item.plaintext}",
        image: {
          full: "${item.image.full}",
          sprite: "${item.image.sprite}",
          group: "${item.image.group}",
          x: ${item.image.x},
          y: ${item.image.y},
          w: ${item.image.w},
          h: ${item.image.h}
        }
      }`
    )}
    ]
    `;
  };

  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/item.json"
  );
  const json: any = await res.json();

  const dataObjects: any = Object.values(json.data);

  const items = dataObjects.map((item: any) => {
    item.id = Object.keys(json.data).find((key) => json.data[key] === item)!;
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      plaintext: item.plaintext,
      image: {
        full: item.image.full,
        sprite: item.image.sprite,
        group: item.image.group,
        x: item.image.x,
        y: item.image.y,
        w: item.image.w,
        h: item.image.h,
      },
    };
  });

  return stringify(items);
}

export async function getChampionsData() {
  const stringify = (champions: Champion[]) => {
    return `
    [${champions.map(
      (champion) => `
      {
        id:"${champion.id}",
        key:"${champion.key}",
        name:"${champion.name}",
        title: "${champion.title}",
        image: {
          full: "${champion.image.full}",
          sprite: "${champion.image.sprite}",
          group: "${champion.image.group}",
          x: ${champion.image.x},
          y: ${champion.image.y},
          w: ${champion.image.w},
          h: ${champion.image.h}
        }
      }`
    )}
    ]
    `;
  };

  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json"
  );
  const json: any = await res.json();

  const dataObjects: any = Object.values(json.data);

  const champions = dataObjects.map((champion: any) => {
    return {
      id: champion.id,
      key: champion.key,
      name: champion.name,
      title: champion.title,
      image: {
        full: champion.image.full,
        sprite: champion.image.sprite,
        group: champion.image.group,
        x: champion.image.x,
        y: champion.image.y,
        w: champion.image.w,
        h: champion.image.h,
      },
    };
  });

  return stringify(champions);
}

export async function getSummonersData() {
  const stringify = (spells: Spell[]) => {
    return `
    [${spells.map(
      (spell) => `
      {
        id:"${spell.id}",
        key:"${spell.key}",
        name:"${spell.name}",
        description: "${spell.description.replace(/"/g, '\\"')}",
        image: {
          full: "${spell.image.full}",
          sprite: "${spell.image.sprite}",
          group: "${spell.image.group}",
          x: ${spell.image.x},
          y: ${spell.image.y},
          w: ${spell.image.w},
          h: ${spell.image.h}
        }
      }`
    )}
    ]
    `;
  };

  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/summoner.json"
  );
  const json: any = await res.json();

  const dataObjects: any = Object.values(json.data);

  const spells = dataObjects.map((spell: any) => {
    return {
      id: spell.id,
      key: spell.key,
      name: spell.name,
      description: spell.description,
      image: {
        full: spell.image.full,
        sprite: spell.image.sprite,
        group: spell.image.group,
        x: spell.image.x,
        y: spell.image.y,
        w: spell.image.w,
        h: spell.image.h,
      },
    };
  });

  return stringify(spells);
}

export async function getChampionClasses48() {
  const classes = CHAMPIONS.map(
    (champion) =>
      `.champion-${champion.key}-48 {
      background: url(${URL + "sprite/" + champion.image.sprite})
      no-repeat top left;
      background-position: ${-champion.image.x}px ${-champion.image.y}px;
      width: 48px;
      height: 48px;
    }`
  );
  console.log(classes);

  return classes.join("\n");
}

export async function getChampionClasses16() {
  const classes = CHAMPIONS.map(
    (champion) =>
      `.champion-${champion.key}-16 {
      background: url(${URL + "sprite/tiny_" + champion.image.sprite})
      no-repeat top left;
      background-position: ${-champion.image.x / 3}px ${
        -champion.image.y / 3
      }px;
      width: 16px;
      height: 16px;
      background-size: 1000% ${
        champion.image.sprite == "champion5.png" ? "200%" : "300%"
      };
    }`
  );
  console.log(classes);

  return classes.join("\n");
}

export async function getChampionClasses24() {
  const classes = CHAMPIONS.map(
    (champion) =>
      `.champion-${champion.key}-24 {
      background: url(${URL + "sprite/tiny_" + champion.image.sprite})
      no-repeat top left;
      background-position: ${-champion.image.x / 2}px ${
        -champion.image.y / 2
      }px;
      width: 24px;
      height: 24px;
      background-size: 1000% ${
        champion.image.sprite == "champion5.png" ? "200%" : "300%"
      };
    }`
  );
  console.log(classes);

  return classes.join("\n");
}

export async function getSummonerClasses24() {
  const classes = SUMMONERS.map(
    (spell) =>
      `.summoner-${spell.key}-24 {
      background: url(${URL + "sprite/tiny_" + spell.image.sprite})
      no-repeat top left;
      background-position: ${-spell.image.x / 2}px ${-spell.image.y / 2}px;
      width: 24px;
      height: 24px;
      background-size: 1000% 400%;
    }`
  );
  console.log(classes);

  return classes.join("\n");
}
