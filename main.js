const GEMINI_API_KEY = 'AIzaSyC0m-xKkedeKGIczmYtI2uhY1nN8N0ppgc'

let input = document.querySelector('input')
let form = document.querySelector('form')
let p = document.querySelector('p')


async function callGemini(e) {
    e.preventDefault()

    p.innerText = "let me think music for YOU Please Wait...."

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": GEMINI_API_KEY,
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Give me music according to my current mood right now i am ${input.value}`,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        p.innerText = data.candidates[0].content.parts[0].text
    } catch (error) {
        console.error("Error:", error);
    }

    form.reset()
}

form.addEventListener("submit", callGemini)