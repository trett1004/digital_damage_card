import * as FileSystem from "expo-file-system";
import {
  Document,
  Packer,
  Paragraph,
  Media,
  HeadingLevel,
  ImageRun,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";
import { Button } from "react-native";
import * as Sharing from "expo-sharing";

export default function ImageToWord({ dbArray }) {
  // console.info("dbArray", dbArray);
  const generateWordDocument = async () => {
    const children = [];
    for (const row of dbArray) {
      const imageBytes = await FileSystem.readAsStringAsync(row.imagePath, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Render Image
      const imageRun = new Paragraph({
        children: [
          new ImageRun({
            data: imageBytes,
            transformation: {
              width: 400,
              height: 533,
            },
          }),
        ],
      });
      // children.push(imageRun);

      // Render Damage Number
      const damageNumber = new Paragraph({
        children: [
          new TextRun({
            text: `Damage Number: `,
            bold: true,
          }),
          new TextRun(row.damageNumber),
        ],
      });
      // children.push(damageNumber);

      // Render Date
      const date = new Paragraph({
        children: [
          new TextRun({
            text: `Date and Time (CET): `,
            bold: true,
          }),
          new TextRun(row.date.toLocaleString("de-DE")),
        ],
      });
      // Render Windfarm
      const windFarm = new Paragraph({
        children: [
          new TextRun({
            text: `Windfarm: `,
            bold: true,
          }),
          new TextRun(row.windFarm),
        ],
      });

      // Render Turbine
      const turbine = new Paragraph({
        children: [
          new TextRun({
            text: `Turbine: `,
            bold: true,
          }),
          new TextRun(row.turbine),
        ],
      });

      // Render Blade Number
      const bladeNumber = new Paragraph({
        children: [
          new TextRun({
            text: `Blade Number: `,
            bold: true,
          }),
          new TextRun(row.bladeNumber),
        ],
      });

      // Render Z [mm]
      const z = new Paragraph({
        children: [
          new TextRun({
            text: `Z [mm]: `,
            bold: true,
          }),
          new TextRun(row.z),
        ],
      });

      // Render Profile depth
      const profileDepth = new Paragraph({
        children: [
          new TextRun({
            text: `Profile depth [% from LE]: `,
            bold: true,
          }),
          new TextRun(row.profileDepth.toString()),
        ],
      });

      // Render Blade Edge
      const bladeEdge = new Paragraph({
        children: [
          new TextRun({
            text: `Blade edge: `,
            bold: true,
          }),
          new TextRun(
            row.bladeEdge === "leadingEdge" ? "Leading edge" : "Trailing Edge"
          ),
        ],
      });

      // Render Blade Side
      const bladeSide = new Paragraph({
        children: [
          new TextRun({
            text: `Blade edge: `,
            bold: true,
          }),
          new TextRun(
            row.bladeSide === "suctionSide" ? "Suction side" : "Pressure side"
          ),
        ],
      });

      // Render Amount
      const amount = new Paragraph({
        children: [
          new TextRun({
            text: `Amount: `,
            bold: true,
          }),
          new TextRun(row.amount.toString()),
        ],
      });
      // Render Dimension [mm]
      const dimensions = new Paragraph({
        children: [
          new TextRun({
            text: `Dimensions [mm]: `,
            bold: true,
          }),
          new TextRun(row.dimensions),
        ],
      });

      // Render Technician
      const technician = new Paragraph({
        children: [
          new TextRun({
            text: `Technician: `,
            bold: true,
          }),
          new TextRun(row.technician),
        ],
      });

      // Separation Line
      const separationLine = new Paragraph({
        children: [
          new TextRun(
            `_____________________________________________________________ `
          ),
          new TextRun(` `),
        ],
      });

      children.push(
        imageRun,
        damageNumber,
        date,
        windFarm,
        turbine,
        bladeNumber,
        z,
        profileDepth,
        bladeEdge,
        bladeSide,
        amount,
        dimensions,
        technician,
        separationLine
      );
    }

    const tableRows = [];
    const tableHeader = new TableRow({
      children: [
        new TableCell({
          width: {
            size: 300,
            type: WidthType.PERCENTAGE,
          },

          children: [new Paragraph("Windfarm")],
        }),
        new TableCell({
          width: {
            size: 300,
            type: WidthType.PERCENTAGE,
          },
          children: [new Paragraph("Turbine")],
        }),
        new TableCell({
          width: {
            size: 300,
            type: WidthType.PERCENTAGE,
          },
          children: [new Paragraph("Blade Number")],
        }),
        new TableCell({
          width: {
            size: 300,
            type: WidthType.PERCENTAGE,
          },
          children: [new Paragraph("Damage Number")],
        }),
        new TableCell({
          width: {
            size: 300,
            type: WidthType.PERCENTAGE,
          },
          children: [new Paragraph("Date")],
        }),
        new TableCell({
          width: {
            size: 300,
            type: WidthType.PERCENTAGE,
          },
          children: [new Paragraph("Technician")],
        }),
      ],
    });

    tableRows.push(tableHeader);
    for (const tableRow of dbArray) {
      console.log("hello");
      const line = new TableRow({
        children: [
          new TableCell({
            width: {
              size: 300,
              type: WidthType.PERCENTAGE,
            },

            children: [new Paragraph(tableRow.windFarm)],
          }),
          new TableCell({
            width: {
              size: 300,
              type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph(tableRow.turbine)],
          }),
          new TableCell({
            width: {
              size: 300,
              type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph(tableRow.bladeNumber)],
          }),
          new TableCell({
            width: {
              size: 300,
              type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph(tableRow.damageNumber)],
          }),
          new TableCell({
            width: {
              size: 300,
              type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph(tableRow.date.toLocaleString("de-DE"))],
          }),
          new TableCell({
            width: {
              size: 300,
              type: WidthType.PERCENTAGE,
            },
            children: [new Paragraph(tableRow.technician)],
          }),
        ],
      });
      tableRows.push(line);
    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({ text: "Inhaltsuebersicht" }),
            new Table({
              columnWidths: [2000, 2000, 2000, 2000, 2000, 2000],
              rows: tableRows,
            }),
          ],
        },
        {
          properties: {}, // You can specify section properties here if needed
          children: children,
        },
      ],
    });

    try {
      // Await the result of buildParagraph

      // Generate and save the document
      const base64 = await Packer.toBase64String(doc);
      const filename = FileSystem.documentDirectory + "MyWordDocument.docx";
      await FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(`Saved file: ${filename}`);
      Sharing.shareAsync(filename);
    } catch (error) {
      console.log("word", error);
    }
  };

  return (
    <Button
      title="Make Word"
      onPress={() => {
        generateWordDocument();
      }}
    />
  );
}
