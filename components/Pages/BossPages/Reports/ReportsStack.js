import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

// nav stack
import { createStackNavigator } from "@react-navigation/stack";

// components
import { Reports } from "./Reports";
import { ReportCustomers } from "./ReportCustomers";
import { ReportServices } from "./ReportServices";
import { ReportDates } from "./ReportDates";

// redux
import { useSelector } from "react-redux";

// fs + excel
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import * as Sharing from "expo-sharing";

export const ReportsStack = () => {
  const Stack = createStackNavigator();

  const report = useSelector((state) => state.report);

  return (
    <Stack.Navigator
      initialRouteName="Reports"
      screenOptions={{
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff",
        // headerStatusBarHeight: 50,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{ title: "Отчеты" }}
      />
      <Stack.Screen
        name="Dates"
        component={ReportDates}
        options={{ title: 'Отчет "Даты"' }}
      />
      <Stack.Screen
        name="Customers"
        component={ReportCustomers}
        options={{ title: 'Отчет "Абоненты"' }}
      />
      <Stack.Screen
        name="Services"
        component={ReportServices}
        options={() => ({
          title: 'Отчет "Услуги"',
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                shareExcel(report, "services");
              }}
            >
              <Text style={styles.text}>Сохранить</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const generateShareableExcel = async (data, filename) => {
  var ws = XLSX.utils.json_to_sheet(data);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cities");
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = FileSystem.cacheDirectory + filename + ".xlsx";
  //console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });
  return uri;
};

const shareExcel = async (data, filename) => {
  const shareableExcelUri = await generateShareableExcel(data, filename);
  Sharing.shareAsync(shareableExcelUri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Android
    dialogTitle: "Your dialog title here", // Android and Web
    UTI: "com.microsoft.excel.xlsx", // iOS
  })
    .catch((error) => {
      console.error("Error", error);
    })
    .then(() => {
      console.log("Return from sharing dialog");
    });
};

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
    backgroundColor: "#FBEEC1",
    padding: 8,
    borderRadius: 96,
  },
  text: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
});
