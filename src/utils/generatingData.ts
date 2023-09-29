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
  name: string;
  title: string;
  imageUrl: string;
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
    "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/item.json"
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
        name:"${champion.name}",
        title: "${champion.title}",
        imageUrl: "${champion.imageUrl}"
      }`
    )}
    ]
    `;
  };

  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json"
  );
  const json: any = await res.json();

  const dataObjects: any = Object.values(json.data);

  const champions = dataObjects.map((champion: any) => {
    return {
      id: champion.id,
      name: champion.name,
      title: champion.title,
      imageUrl: URL + "champion/" + champion.id + ".png",
    };
  });

  return stringify(champions);
}
