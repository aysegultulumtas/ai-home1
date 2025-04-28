export interface CommandResponse {
    keywords: string[];
    response: string;
    action: (param: any) => any;
  }
  
  export const COMMAND_RESPONSES: CommandResponse[] = [
    {
      keywords: ["ışık", "lamba", "aydınlık"],
      response: "💡 Işıkları {state} için!",
      action: (deviceId: number) => ({ type: "TOGGLE_DEVICE", deviceId })
    },
    {
      keywords: ["klima", "sıcaklık", "soğut"],
      response: "❄️ Klima {value}°C ayarlandı!",
      action: (value: number) => ({ type: "SET_TEMP", value })
    }
  ];
  
  export const DEFAULT_RESPONSES: string[] = [
    "Anlayamadım, tekrar deneyin?",
    "Komut: 'ışıkları aç', 'klimayı 22 yap'"
  ];