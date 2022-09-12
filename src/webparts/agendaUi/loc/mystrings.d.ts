declare interface IAgendaUiWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'AgendaUiWebPartStrings' {
  const strings: IAgendaUiWebPartStrings;
  export = strings;
}
