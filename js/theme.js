var theme = window.localStorage.currentTheme;

        $('body').addClass(theme);

        if ($("body").hasClass("night")) {
            $('.dntoggle').addClass('fa-sun-o');
            $('.dntoggle').removeClass('fa-moon-o');
        } else {
            $('.dntoggle').removeClass('fa-sun-o');
            $('.dntoggle').addClass('fa-moon-o');
        }

        $('.dntoggle').click(function() {
            $('.dntoggle').toggleClass('fa-sun-o');
            $('.dntoggle').toggleClass('fa-moon-o');

            if ($("body").hasClass("night")) {
                $('body').toggleClass('night');
                localStorage.removeItem('currentTheme');
                localStorage.currentTheme = "day";
            } else {
                $('body').toggleClass('night');
                localStorage.removeItem('currentTheme');
                localStorage.currentTheme = "night";
            }
        });
