import Config from "../Config";

export async function payment(data) {
  try {
    const response = await fetch(`${Config.api}/payment`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    return [];
  }
}
