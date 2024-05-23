/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "Combo" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Combo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductToCombo" (
    "product_id" INTEGER NOT NULL,
    "combo_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductToCombo_pkey" PRIMARY KEY ("product_id","combo_id")
);

-- CreateTable
CREATE TABLE "_ComboToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ComboToProduct_AB_unique" ON "_ComboToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ComboToProduct_B_index" ON "_ComboToProduct"("B");

-- AddForeignKey
ALTER TABLE "ProductToCombo" ADD CONSTRAINT "ProductToCombo_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductToCombo" ADD CONSTRAINT "ProductToCombo_combo_id_fkey" FOREIGN KEY ("combo_id") REFERENCES "Combo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComboToProduct" ADD CONSTRAINT "_ComboToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Combo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComboToProduct" ADD CONSTRAINT "_ComboToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
