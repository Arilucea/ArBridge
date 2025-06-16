import pathlib
import sys
import os # Necesario para comparación de rutas robusta

# --- Configuración ---
# Directorio RAÍZ donde empezar a buscar archivos .js (incluyendo subcarpetas)
# '.' significa el directorio actual donde se ejecuta el script.
SOURCE_DIRECTORY = '.'

# Nombre del archivo de salida donde se combinará todo
# Cambiado para indicar que es recursivo y evitar sobreescritura accidental
OUTPUT_FILENAME = 'combined_recursive_output.js'
# --- Fin Configuración ---

def combine_js_files_recursively(source_dir, output_file):
    """
    Busca archivos .js RECURSIVAMENTE en source_dir y sus subdirectorios,
    lee su contenido y lo escribe en output_file, añadiendo un comentario
    con la ruta relativa del archivo original antes de cada bloque.
    """
    source_path = pathlib.Path(source_dir).resolve() # Resolvemos para tener ruta absoluta base
    output_filepath = source_path / output_file

    # Obtener la ruta absoluta del script actual para evitar procesarlo
    try:
        script_path = pathlib.Path(sys.argv[0]).resolve()
    except IndexError:
        script_path = None
        print("Advertencia: No se pudo determinar la ruta del script actual.")

    # Actualizar mensaje para indicar búsqueda recursiva
    print(f"Buscando archivos .js recursivamente en: {source_path}")
    print(f"Archivo de salida será: {output_filepath}")

    # --- CAMBIO CLAVE: Usar '**/*.js' para búsqueda recursiva ---
    # Esto encontrará .js en source_path y CUALQUIER subdirectorio dentro de él
    js_files_to_process = list(source_path.glob('**/*.js'))
    # -----------------------------------------------------------

    if not js_files_to_process:
        print("No se encontraron archivos .js en el directorio especificado o sus subdirectorios.")
        return

    # Ordenar por la ruta completa para un orden más predecible (opcional)
    # Esto asegura que los archivos de un mismo subdirectorio tiendan a estar juntos
    js_files_to_process.sort()

    processed_count = 0
    skipped_count = 0

    try:
        # Abrimos el archivo de salida en modo escritura ('w').
        with open(output_filepath, 'w', encoding='utf-8') as outfile:
            outfile.write(f"// Script combinado generado automáticamente (recursivo)\n")
            outfile.write(f"// Contiene el código de los archivos .js encontrados en: {source_path} y subdirectorios\n")
            outfile.write(f"// Fecha de generación: {current_time_str}\n") # Añadido para info extra
            outfile.write("// ================================================================\n\n")

            for js_filepath in js_files_to_process:
                # Resolvemos la ruta del archivo encontrado para comparación segura
                js_file_path_resolved = js_filepath.resolve()

                # Intentar obtener ruta relativa para logs y comentarios
                try:
                    relative_path = js_filepath.relative_to(source_path)
                except ValueError:
                    # Esto puede pasar si un enlace simbólico apunta fuera del source_path
                    relative_path = js_filepath.name # Usar solo el nombre si no es relativo

                # Evitar procesar el propio archivo de salida
                # Usamos os.path.normcase para comparación insensible a mayús/minús en Windows
                if os.path.normcase(str(js_file_path_resolved)) == os.path.normcase(str(output_filepath)):
                    print(f"-> Omitiendo archivo de salida: {relative_path}")
                    skipped_count += 1
                    continue

                # Evitar procesar el propio script si se llama algo.js
                if script_path and os.path.normcase(str(js_file_path_resolved)) == os.path.normcase(str(script_path)):
                     print(f"-> Omitiendo el propio script: {relative_path}")
                     skipped_count += 1
                     continue

                # Mostrar la ruta relativa en el log para claridad
                print(f"-> Procesando: {relative_path}")
                try:
                    # Escribir el comentario con la RUTA RELATIVA del archivo original
                    outfile.write(f"// ===== Inicio Contenido de: {relative_path} =====\n\n")

                    # Leer el contenido del archivo .js actual
                    with open(js_filepath, 'r', encoding='utf-8') as infile:
                        content = infile.read()
                        outfile.write(content)

                    # Escribir separador para mayor claridad
                    outfile.write(f"\n\n// ===== Fin Contenido de: {relative_path} =====\n\n")
                    processed_count += 1

                except Exception as read_error:
                    # Si hay un error leyendo un archivo, lo notificamos y continuamos
                    error_message = f"// !!! ERROR al leer el archivo: {relative_path} - {read_error} !!!\n\n"
                    print(f"   ERROR: {error_message.strip()}")
                    outfile.write(error_message) # Escribir error también en el archivo salida
                    skipped_count += 1


            print("-" * 30)
            print(f"¡Proceso completado!")
            print(f"Se combinaron {processed_count} archivos .js (búsqueda recursiva).")
            if skipped_count > 0:
                 print(f"Se omitieron {skipped_count} archivos (salida/script/errores).")
            print(f"El contenido se ha guardado en: {output_filepath}")

    except IOError as e:
        print(f"\nERROR FATAL: No se pudo escribir en el archivo de salida '{output_filepath}'. Verifica los permisos.")
        print(f"Detalle del error: {e}")
    except Exception as e:
        print(f"\nERROR FATAL: Ocurrió un error inesperado durante el proceso.")
        print(f"Detalle del error: {e}")

# --- Obtener fecha y hora actual ---
# (He añadido esto para incluirlo en el archivo generado)
import datetime
# Usando la fecha y hora actual proporcionada en el contexto
# Nota: El contexto indica 2025, lo usaré como ejemplo. En una ejecución real, usaría la hora actual del sistema.
# current_time_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S %Z") # <- Esto usarías normalmente
context_time = datetime.datetime(2025, 4, 15, 13, 1, 30) # Usando la hora del contexto como ejemplo
current_time_str = context_time.strftime("%Y-%m-%d %H:%M:%S CEST") # Formato con zona horaria del contexto

# --- Ejecución del script ---
if __name__ == "__main__":
    combine_js_files_recursively(SOURCE_DIRECTORY, OUTPUT_FILENAME)