// キーボード入力用クラス
class InputKey {
    constructor() {
        this.inputKey = {
            Left: false,
            Right: false,
            Up: false,
            Down: false
        };

        document.addEventListener("keydown", (e) => {
            if (e.key === "w") {
                this.inputKey.Up = true;
            } else if (e.key === "a") {
                this.inputKey.Left = true;
            } else if (e.key === "d") {
                this.inputKey.Right = true;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.key === "w") {
                this.inputKey.Up = false;
            } else if (e.key === "a") {
                this.inputKey.Left = false;
            } else if (e.key === "d") {
                this.inputKey.Right = false;
            }
        });
    }
}

export default InputKey;