const messages = [
    "You are doing great, {userName}! Keep up the good work!",
    "Your progress is impressive, {userName}! Stay focused and keep pushing forward!",
    "Every step you take is a step towards success! Keep going!",
    "You are capable of achieving amazing things, {userName}! Believe in yourself!",
    "Your hard work is paying off! Keep up the momentum!",
    "You are making a difference, {userName}! Your efforts are appreciated!",
    "You are on the right track! Keep moving forward!",
    "Reflection shows growth, {userName}. Your journal entries demonstrate your personal development!",
    "Your consistency in journaling is building a better you, {userName}!",
    "Each word you write is a step towards understanding yourself better. Incredible job!",
    "Your thoughts matter, {userName}. Thank you for sharing them in your journal!",
    "Today's reflections are tomorrow's wisdom. You're building something special!",
    "The time you spend journaling is an investment in yourself, {userName}. Well done!",
    "Your dedication to self-improvement through journaling is inspiring, {userName}!",
    "Small steps lead to big changes. Your journaling practice proves it, {userName}!",
    "Your journal is becoming a beautiful story of growth and resilience. Keep writing!",
    "Self-awareness is a superpower, {userName}, and you're strengthening it every day!",
    "Your commitment to journaling shows how much you value your personal growth. Amazing!",
    "Writing your thoughts takes courage, {userName}. You should be proud of yourself!",
    "Every journal entry is a victory over procrastination. Way to go, {userName}!",
    "You're creating a meaningful record of your journey through life. That's powerful!",
    "Your insights are getting deeper and more profound, {userName}. Keep exploring!",
    "Remember that progress isn't always visible, but it's happening with every word you write!",
    "Your future self will thank you for the reflections you're capturing today, {userName}!",
    "Taking time for yourself through journaling shows true self-respect. Wonderful job!",
    "The patterns you discover in your journaling can transform your life, {userName}!",
    "Your authenticity in your journal entries is a gift to yourself. Embrace it!"
]

let remainingMessages = [...messages];

export function getRandomMessage(userName: string): string {
    if (remainingMessages.length === 0) {
        remainingMessages = [...messages];
    }

    const randomIndex = Math.floor(Math.random() * remainingMessages.length);
    const message = remainingMessages.splice(randomIndex, 1)[0];

    return message.replace("{userName}", userName);
}
