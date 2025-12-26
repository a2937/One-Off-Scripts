import bpy
import sys
import site
import logging
import subprocess
import threading

# Set up logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
# List of packages required by the add-on/plugin
REQUIRED_PACKAGES = {
    "fileseq": "fileseq==1.15.2",
    "meshio": "meshio==5.3.4",
    "rich": "rich==13.7.0",
    "requests": "requests==2.31.0",
    "pillow": "pillow==12.0.0"
}
def get_blender_python_path():
    """Returns the path of Blender's embedded Python interpreter."""
    return sys.executable
def get_modules_path():
    """Return a writable directory for installing Python packages."""
    return bpy.utils.user_resource("SCRIPTS", path="modules", create=True)
def append_modules_to_sys_path(modules_path):
    """Ensure Blender can find installed packages."""
    if modules_path not in sys.path:
        sys.path.append(modules_path)
    site.addsitedir(modules_path)
def display_message(message, title="Notification", icon='INFO'):
    """Show a popup message in Blender."""
    def draw(self, context):
        self.layout.label(text=message)
    def show_popup():
        bpy.context.window_manager.popup_menu(draw, title=title, icon=icon)
        return None  # Stops timer
    bpy.app.timers.register(show_popup)
def install_package(package, modules_path):
    """Install a single package using Blender's Python."""
    try:
        logger.info(f"Installing {package}...")
        subprocess.check_call([
            get_blender_python_path(),
            "-m",
            "pip",
            "install",
            "--upgrade",
            "--target",
            modules_path,
            package
        ])
        logger.info(f"{package} installed successfully.")
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to install {package}. Error: {e}")
        display_message(f"Failed to install {package}. Check console for details.", icon='ERROR')
def background_install_packages(packages, modules_path):
    """Install missing packages in a background thread."""
    def install_packages():
        wm = bpy.context.window_manager
        wm.progress_begin(0, len(packages))
        for i, (module_name, pip_spec) in enumerate(packages.items()):
            try:
                __import__(module_name)
                logger.info(f"'{module_name}' is already installed.")
            except ImportError:
                install_package(pip_spec, modules_path)
            wm.progress_update(i + 1)
        wm.progress_end()
        display_message("All required packages installed successfully.")
    threading.Thread(target=install_packages, daemon=True).start()
# Setup
modules_path = get_modules_path()
append_modules_to_sys_path(modules_path)
# Start package installation
background_install_packages(REQUIRED_PACKAGES, modules_path)



def strVector3( v3 ):
    return str(v3.x) + "," + str(v3.y) + "," + str(v3.z)

## TODO: make a panel with the property; filePath and depth (or make a depth map or something)




filePath = r"F:\One off Scripts\One-Off-Scripts\3D Pixel Art from Image\smbvarious.png" # TODO Remove hard-coding later
maxDepth = 5


# NOTE: Transparent color is presumed to be normal transparent 
transparent_red = 0 
transparent_green = 0 
transparent_blue = 0
transparent_alpha = 0

# Open up image
import PIL
from PIL import Image
input_image = Image.open(filePath)
pixel_map = input_image.convert("RGBA").load()
width, height = input_image.size
materials = {}
materialCreatedCount = 0

offsetZ = height 
offsetY = 0
offsetX = 0 

for depth in range(maxDepth):
    print(depth)
    for i in range(width):
        print(i)
        for j in range(height):
            print(j)
            pixel = pixel_map[i, j]
            if pixel[0] == transparent_red and pixel[1] == transparent_green and pixel[2] == transparent_blue and pixel[3] == transparent_alpha:
                print("Skipping") # Do nothing as there is no pixel  
            else: 
                # Assume 3D center is 0, 0 , 0
                # create a new cube
                bpy.ops.mesh.primitive_cube_add()
                cube = bpy.context.selected_objects[0]
                cube.name = str(i) + "," + str(j) + " at " + str(depth) + " depth"
                cube.location = (i + offsetX, depth + offsetY, -j + offsetZ)
                cube.dimensions[0] = 1
                cube.dimensions[1] = 1
                cube.dimensions[2] = 1
                matKey = str(pixel[0]) + str(pixel[1]) + str(pixel[2]) 
                if matKey in materials:
                    cube.data.materials.append(materials[matKey])
                    bpy.ops.object.shade_smooth()
                else:
                    materialCreatedCount = materialCreatedCount + 1 
                    materials[matKey] = bpy.data.materials.new(name='Material' + str(materialCreatedCount))
                    materials[matKey].use_nodes = True
                    principled_bsdf_node = materials[matKey].node_tree.nodes["Principled BSDF"]
                    principled_bsdf_node.inputs["Base Color"].default_value = (pixel[0] / 255, pixel[1] / 255,pixel[2] / 255, 1)
                    principled_bsdf_node.inputs["Metallic"].default_value = 1.0
                    cube.data.materials.append(materials[matKey])
                    bpy.ops.object.shade_smooth()
                    




