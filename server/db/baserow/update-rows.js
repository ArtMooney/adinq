export async function updateRows(token, tableId, data) {
  const BATCH_SIZE = 100;
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Token " + token,
  };

  const batches = [];
  for (let i = 0; i < data.items.length; i += BATCH_SIZE) {
    batches.push({
      items: data.items.slice(i, i + BATCH_SIZE),
    });
  }

  const results = [];

  for (const batchData of batches) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        let response = await fetch(
          `https://api.baserow.io/api/database/rows/table/${tableId}/batch/?user_field_names=true`,
          {
            method: "PATCH",
            body: JSON.stringify(batchData),
            headers: headersList,
          },
        );

        if (!response.ok) {
          if (attempt === 3) {
            return { error: `HTTP error! status: ${response.status}` };
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }

        const result = await response.json();
        results.push(result);
        break;
      } catch (error) {
        if (attempt === 3) {
          return { error: `Network error: ${error.message}` };
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  return {
    items: results.flatMap((result) => result.items || []),
  };
}
