# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.28

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/moonlyss/codes/these/hecate

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/moonlyss/codes/these/hecate/build

# Include any dependencies generated for this target.
include CMakeFiles/Hecate.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/Hecate.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/Hecate.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/Hecate.dir/flags.make

CMakeFiles/Hecate.dir/src/main.cpp.o: CMakeFiles/Hecate.dir/flags.make
CMakeFiles/Hecate.dir/src/main.cpp.o: /home/moonlyss/codes/these/hecate/src/main.cpp
CMakeFiles/Hecate.dir/src/main.cpp.o: CMakeFiles/Hecate.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/home/moonlyss/codes/these/hecate/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/Hecate.dir/src/main.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/Hecate.dir/src/main.cpp.o -MF CMakeFiles/Hecate.dir/src/main.cpp.o.d -o CMakeFiles/Hecate.dir/src/main.cpp.o -c /home/moonlyss/codes/these/hecate/src/main.cpp

CMakeFiles/Hecate.dir/src/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/Hecate.dir/src/main.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/moonlyss/codes/these/hecate/src/main.cpp > CMakeFiles/Hecate.dir/src/main.cpp.i

CMakeFiles/Hecate.dir/src/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/Hecate.dir/src/main.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/moonlyss/codes/these/hecate/src/main.cpp -o CMakeFiles/Hecate.dir/src/main.cpp.s

# Object files for target Hecate
Hecate_OBJECTS = \
"CMakeFiles/Hecate.dir/src/main.cpp.o"

# External object files for target Hecate
Hecate_EXTERNAL_OBJECTS =

Hecate: CMakeFiles/Hecate.dir/src/main.cpp.o
Hecate: CMakeFiles/Hecate.dir/build.make
Hecate: CMakeFiles/Hecate.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir=/home/moonlyss/codes/these/hecate/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable Hecate"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/Hecate.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/Hecate.dir/build: Hecate
.PHONY : CMakeFiles/Hecate.dir/build

CMakeFiles/Hecate.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/Hecate.dir/cmake_clean.cmake
.PHONY : CMakeFiles/Hecate.dir/clean

CMakeFiles/Hecate.dir/depend:
	cd /home/moonlyss/codes/these/hecate/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/moonlyss/codes/these/hecate /home/moonlyss/codes/these/hecate /home/moonlyss/codes/these/hecate/build /home/moonlyss/codes/these/hecate/build /home/moonlyss/codes/these/hecate/build/CMakeFiles/Hecate.dir/DependInfo.cmake "--color=$(COLOR)"
.PHONY : CMakeFiles/Hecate.dir/depend

