export const playClickSound = () => {
    const audio = new Audio('/click.mp3'); // Ensure these files exist in public or handle errors
    audio.volume = 0.5;
    audio.play().catch(() => { }); // Catch error if user hasn't interacted yet
};

export const playSuccessSound = () => {
    const audio = new Audio('/success.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => { });
};

export const playErrorSound = () => {
    const audio = new Audio('/error.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => { });
};
