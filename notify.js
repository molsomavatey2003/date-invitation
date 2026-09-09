export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { date, time, activities } = req.body;

    if (!date || !time || !activities) {
      return res.status(400).json({
        error: "Missing information"
      });
    }

    const message = `
🎉 NEW INVITATION RESPONSE!

📅 Date: ${date}
⏰ Time: ${time}

✨ Plan:
${activities}

Someone just completed your invitation! 👀
`;

    const telegramUrl =
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message
      })
    });

    if (!response.ok) {
      return res.status(500).json({
        error: "Telegram notification failed"
      });
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Server error"
    });
  }
}
