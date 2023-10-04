import { CHAMPIONS } from "./data";

const URL =
  "https://dtneqrqtsogjewiotxnf.supabase.co/storage/v1/object/public/lolassets/";

type Item = {
  id: string;
  name: string;
  description: string;
  plaintext: string;
  imageUrl: string;
};

type Champion = {
  id: string;
  key: number;
  name: string;
  title: string;
  url: string;
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
        imageUrl: "${item.imageUrl}"
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
      imageUrl: URL + "item/" + item.id + ".png",
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
        url: "${champion.url}",
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
      url: URL + "sprite/" + champion.image.sprite,
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
      background: url(${URL + "sprite/mini_" + champion.image.sprite})
      no-repeat top left;
      background-position: ${-champion.image.x / 3}px ${
        -champion.image.y / 3
      }px;
      width: 16px;
      height: 16px;
    }`
  );
  console.log(classes);

  return classes.join("\n");
}
