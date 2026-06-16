const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const BORDER_SIZE = 100;
const THUMB_SIZE = 90;

upload.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const img = new Image();

    img.onload = () => {

        // Keep original image size
        const originalWidth = img.width;
        const originalHeight = img.height;

        // Add border area
        canvas.width = originalWidth + BORDER_SIZE * 2;
        canvas.height = originalHeight + BORDER_SIZE * 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /*
         * TOP BORDER
         */
        for (let x = 0; x < canvas.width; x += THUMB_SIZE) {
            ctx.drawImage(
                img,
                x,
                0,
                THUMB_SIZE,
                THUMB_SIZE
            );
        }

        /*
         * BOTTOM BORDER
         */
        for (let x = 0; x < canvas.width; x += THUMB_SIZE) {
            ctx.drawImage(
                img,
                x,
                canvas.height - THUMB_SIZE,
                THUMB_SIZE,
                THUMB_SIZE
            );
        }

        /*
         * LEFT BORDER
         */
        for (let y = THUMB_SIZE; y < canvas.height - THUMB_SIZE; y += THUMB_SIZE) {
            ctx.drawImage(
                img,
                0,
                y,
                THUMB_SIZE,
                THUMB_SIZE
            );
        }

        /*
         * RIGHT BORDER
         */
        for (let y = THUMB_SIZE; y < canvas.height - THUMB_SIZE; y += THUMB_SIZE) {
            ctx.drawImage(
                img,
                canvas.width - THUMB_SIZE,
                y,
                THUMB_SIZE,
                THUMB_SIZE
            );
        }

        /*
         * Original image in center
         */
        ctx.drawImage(
            img,
            BORDER_SIZE,
            BORDER_SIZE,
            originalWidth,
            originalHeight
        );
    };

    img.src = URL.createObjectURL(file);
});

/*
 * Download
 */
document.getElementById("downloadBtn").addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = "framed-image.png";

    link.href = canvas.toDataURL("image/png");

    link.click();
});