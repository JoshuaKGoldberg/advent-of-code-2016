(() => {
    const input = `
R3, L2, L2, R4, L1, R2, R3, R4, L2, R4, L2, L5, L1, R5, R2, R2, L1, R4, R1, L5, L3, R4, R3, R1, L1, L5, L4, L2, R5, L3, L4, R3, R1, L3, R1, L3, R3, L4, R2, R5, L190, R2, L3, R47, R4, L3, R78, L1, R3, R190, R4, L3, R4, R2, R5, R3, R4, R3, L1, L4, R3, L4, R1, L4, L5, R3, L3, L4, R1, R2, L4, L3, R3, R3, L2, L5, R1, L4, L1, R5, L5, R1, R5, L4, R2, L2, R1, L5, L4, R4, R4, R3, R2, R3, L1, R4, R5, L2, L5, L4, L1, R4, L4, R4, L4, R1, R5, L1, R1, L5, R5, R1, R1, L3, L1, R4, L1, L4, L4, L3, R1, R4, R1, R1, R2, L5, L2, R4, L1, R3, L5, L2, R5, L4, R5, L5, R3, R4, L3, L3, L2, R2, L5, L5, R3, R4, R3, R4, R3, R1
`;

    const position = [0, 0];
    let direction = 0;

    const history = {};
    let foundHeadquarters = false;

    for (const step of input.replace(/\,/g, "").trim().split(" ")) {
        const turning = step[0];
        const distance = parseInt(step.slice(1));
        let delta = [0, 0];

        if (turning === "R") {
            if (direction === 3) {
                direction = 0;
            } else {
                direction += 1;
            }
        } else {
            if (direction === 0) {
                direction = 3;
            } else {
                direction -= 1;
            }
        }

        switch (direction) {
            case 0:
                delta[0] = 1;
                break;

            case 1:
                delta[1] = 1;
                break;

            case 2:
                delta[0] = -1;
                break;

            case 3:
                delta[1] = -1;
                break;
        }

        for (let i = 0; i < distance; i += 1) {
            position[0] += delta[0];
            position[1] += delta[1];

            if (!foundHeadquarters) {
                const key = position.join(",");

                if (history[key]) {
                    console.log("Visited twice", position, "at distance", Math.abs(position[0]) + Math.abs(position[1]));
                    foundHeadquarters = true;
                    break;
                } else {
                    history[key] = true;
                }
            }
        }
    }

    console.log("Final position", position, "at distance", Math.abs(position[0]) + Math.abs(position[1]));
})();
