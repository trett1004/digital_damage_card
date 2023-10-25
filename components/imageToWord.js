import * as FileSystem from "expo-file-system";
import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
} from "docx";
import { Button } from "react-native-paper";
import * as Sharing from "expo-sharing";
import { getDateString } from "../helpers/currentDate";
import { View } from "react-native";

export function ImageToWord({ dbArray }) {
  const generateWordDocument = async () => {
    // Declare array for iteration of database data
    const damageDetails = [];
    for (const row of dbArray) {
      // specify images encoding type
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

      // Render separation Line
      const separationLine = new Paragraph({
        children: [
          new TextRun(
            `_____________________________________________________________ `
          ),
          new TextRun(` `),
        ],
      });

      // push the rendered docx data to the array
      damageDetails.push(
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

    //////////////////// Make table of contens ////////////////////
    // Declare array that holds the rows of the table
    const tableRows = [];
    // Make table header row and push it to the array
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

    //
    tableRows.push(tableHeader);

    // iterate over database data and make table rows
    for (const tableRow of dbArray) {
      const row = new TableRow({
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
      tableRows.push(row);
    }

    // Create docx document with the created arrays from above
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
          properties: {},
          children: damageDetails,
        },
      ],
    });

    try {
      // Generate and save the document
      const base64 = await Packer.toBase64String(doc);
      // Make the filename talking
      const filenameContentsWindfarms = dbArray
        .filter((element) => element.windFarm)
        .map((element) => element.windFarm)
        .map((windFarms) => windFarms.split(","))
        .join("_");

      const filenameContentsTurbines = dbArray
        .filter((element) => element.turbine)
        .map((element) => element.turbine)
        .map((turbines) => turbines.split(","))
        .join("_");

      const date = getDateString();

      const filename =
        FileSystem.documentDirectory +
        `Damage_Report_${date}_${filenameContentsWindfarms}__${filenameContentsTurbines}.docx`;
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
    <View style={{ marginBottom: 20 }}>
      <Button
        style={{ width: 200 }}
        icon="microsoft-word"
        mode="contained"
        onPress={() => {
          generateWordDocument();
        }}>
        Create Report
      </Button>
    </View>
  );
}
