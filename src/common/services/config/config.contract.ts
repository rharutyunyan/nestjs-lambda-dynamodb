export interface IServiceConfig {
  environment: string;
  port: number;
  swagger: {
    Name: string;
    Description: string;
    Version: string;
    Path: string;
  };
  globalPrefix: string;
  print();
}
