FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["USSC/USSC.csproj", "USSC/"]
RUN dotnet restore "USSC/USSC.csproj"
COPY . .
WORKDIR "/src/USSC"
RUN dotnet build "USSC.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "USSC.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "USSC.dll"]
