# ─── STAGE 1: BUILD ───────────────────────────────────────────
# Usamos la imagen oficial del SDK de .NET 8
# El SDK incluye todo: compilador, NuGet, dotnet CLI
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Establecemos el directorio de trabajo dentro del contenedor
# Es como hacer cd /app — todo lo siguiente ocurre aquí
WORKDIR /app

# Copiamos PRIMERO solo los archivos .csproj y .sln
# ¿Por qué primero solo estos? Por caché de Docker.
# Si tu código cambia pero los proyectos no, Docker reutiliza
# la capa del restore sin volver a descargar todos los paquetes NuGet
COPY src/*.sln ./src/
COPY src/TaskFlow.API/TaskFlow.API.csproj ./src/TaskFlow.API/
COPY src/TaskFlow.Application/TaskFlow.Application.csproj ./src/TaskFlow.Application/
COPY src/TaskFlow.Domain/TaskFlow.Domain.csproj ./src/TaskFlow.Domain/
COPY src/TaskFlow.Infrastructure/TaskFlow.Infrastructure.csproj ./src/TaskFlow.Infrastructure/
COPY src/TaskFlow.Tests/TaskFlow.Tests.csproj ./src/TaskFlow.Tests/

# Restauramos los paquetes NuGet
# Esta capa se cachea mientras los .csproj no cambien
RUN dotnet restore src/TaskFlow.sln

# Ahora copiamos el resto del código fuente
COPY src/ ./src/

# Compilamos y publicamos en modo Release
# --no-restore porque ya lo hicimos arriba
# -o /app/publish es donde queda el resultado
RUN dotnet publish src/TaskFlow.API/TaskFlow.API.csproj \
    --configuration Release \
    --output /app/publish

# ─── STAGE 2: RUNTIME ─────────────────────────────────────────
# Imagen mucho más ligera — solo el runtime, sin SDK
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

# Copiamos SOLO el resultado del stage anterior
# El SDK y el código fuente quedan descartados
COPY --from=build /app/publish .

# El puerto en que tu API escucha dentro del contenedor
# Este proyecto usa el mismo puerto que la configuración de desarrollo: 5288
ENV ASPNETCORE_URLS=http://+:5288
ENV ASPNETCORE_ENVIRONMENT=Development
EXPOSE 5288

# El comando que se ejecuta cuando el contenedor arranca
ENTRYPOINT ["dotnet", "TaskFlow.API.dll"]