module.exports = function(grunt) {

// 1. Toutes les configurations vont ici: 
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

       jshint: {
         
          all: ['public/js/*.js']

       },

      sass: {
        dist: {
            options: {
                style: 'expanded'
            },
            files: {
                'public/css/global.css': 'public/sass/global.scss'
            }
        } ,
        minified: {
            options: {
                style: 'compressed'
            },
            files: {
                'public/css/global.min.css': 'public/sass/global.scss'
            }
        } 
    },
          // 2. la configuration pour la concaténation va ici.
    concat: {
        
         dist: {
            src: [
                'public/js/libs/*.js', // tous les JS dans libs
                'public/js/global.js'  // ce fichier là
                ],
            dest: 'public/js/build/production.js' 
         }

    },
      // 3. la configuration pour la minification va ici.  
    uglify: { 
        options:{
            mangle:false
        },
        build: {
            src: 'public/js/build/production.js',
            dest: 'public/js/build/production.min.js'
        }
    },
   
     // 4. la configuration pour la minification et concaténation automatique va ici.  
    watch: {
        options: {
            livereload: true,
          },
        scripts: {
            files: [ 'index.html','global.css','Gruntfile.js','js/*.js'],
            tasks: ['concat', 'uglify'],
            
        },
        css: {
            files: ['public/sass/*.scss'],
                tasks: ['sass'],
                
            } 
    },
    express:{ 
            all:{
                options:{
                    port:3000,
                    hostname:'localhost',
                    bases:['./public'],
                    livereload:true 
                }
            }
        }
   

});

// 5. Nous disons à Grunt que nous voulons ces plug-in.
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.loadNpmTasks('grunt-express');
grunt.loadNpmTasks('grunt-serve');
    
// 6. Nous disons à Grunt quoi faire lorsque nous tapons "grunt" dans la console.
grunt.registerTask('default', ['jshint','watch','concat','uglify',]);
grunt.registerTask('server',['express','watch','sass']);

}; 