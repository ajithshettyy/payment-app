import Config from "../Config";

export async function transactions() {
  try {
    const response = await fetch(`${Config.api}/transactions`);
    return await response.json();
  } catch (error) {
    return [];
  }
}
