$(document).ready(function(e) {

    $(".stepsForm").stepsForm({
        width: '100%',
        active: 0,
        errormsg: 'Check faulty fields.',
        // sendbtntext: 'Create Account',
    });

    $(".container .themes>span").click(function(e) {
        $(".container .themes>span").removeClass("selectedx");
        $(this).addClass("selectedx");
        $(".stepsForm").removeClass().addClass("stepsForm");
        $(".stepsForm").addClass("sf-theme-" + $(this).attr("data-value"));
    });

    $("#step1Form").validate({
        focusInvalid: true,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var firstInvalidElement = $(validator.errorList[0].element);
                //$('html,body').scrollTop(firstInvalidElement.offset().top);
                $("html, body").animate({
                    scrollTop: firstInvalidElement.offset().top - 100
                }, 600);
                //firstInvalidElement.focus();
            }
        },
        rules: {

            name: {
                required: true,
            },
            age: {
                required: true,
            },
            mobile_no: {
                required: true,
            },
            gender: {
                required: true,
            },
            state: {
                required: true,
            },
            city: {
                required: true,
            },
            Address: {
                required: true,
            },
            testing_technician: {
                required: true,
            },
            patient_Reg_no: {
                required: true,
            },
            testing_date: {
                required: true,
            },
            receipt_no: {
                required: true,
            },
            ordering_physician: {
                required: true,
            },
            histamine: {
                required: true,
            },
        },
        // messages: {
        //     estimated_cost: {
        //         number: "Please enter a valid amount.",
        //     },
        //     'payment_amount[]': {
        //         required: "Payment amount is required.",
        //         number: "Please enter a valid amount."
        //     }
        // },
        highlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
            } else {
                elem.addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
            } else {
                elem.removeClass(errorClass);
            }
        },
        errorPlacement: function (error, element) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                element = $("#select2-" + elem.attr("id") + "-container").parent();
                error.insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var ajaxurl = $("#step1Route").val();
            var seriealized = $(form).serialize();
            // parsestocktoform(form);
            //console.log(ajaxurl);
            //ajax to block the stock before
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: seriealized,
                cache: false,
                processData: false,
                success: function (data) {

                    var issubmitted = data.success;
                    var message = data.response;
                    console.log(message.patient_id)
                    $('#patientId1').val(message.patient_id)
                    $('#patientId2').val(message.patient_id)
                    $('#patientId3').val(message.patient_id)
                    $('#patientId4').val(message.patient_id)
                    $('#patientId5').val(message.patient_id)
                    $('#patientId6').val(message.patient_id)
                    $('#patientId7').val(message.patient_id)
                    if (issubmitted == false) {
                        swal({title: "Sorry", text:  " "+message, type: "error", confirmButtonText: "OK" }).then((value) => {
                          // location.href('/patients');
                        });
                        // swal("Sorry", message, "error");
                       // reloadPage();
                    } else {
                        swal({title: "Success", text:  " "+message.message, type: "success",icon: "success", confirmButtonText: "OK" }).then((value) => {
                          // location.href('/patients');
                            $('#step1').fadeIn()
                            $('#step1').css({
                                display: "none"
                            })
                            $('#step2').css({
                                display: "inline-block"
                            })

                            $('#step1btn').removeClass("sf-active")
                            $('#step2btn').addClass("sf-active")
                          
                        });
                    }

                },
                error:function(xhr, status, error){
                    
                    swal({title: "Oops", text:  " "+message, type: "error", confirmButtonText: "OK" }).then((value) => {
                          // location.href('/patients');
                        });

                }
            });

            //ajax method ends here

            // $('input[name^="pages_title"]')

        }
    });
    $("#step2Form").validate({
        focusInvalid: true,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var firstInvalidElement = $(validator.errorList[0].element);
                //$('html,body').scrollTop(firstInvalidElement.offset().top);
                $("html, body").animate({
                    scrollTop: firstInvalidElement.offset().top - 100
                }, 600);
                //firstInvalidElement.focus();
            }
        },
        highlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
            } else {
                elem.addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
            } else {
                elem.removeClass(errorClass);
            }
        },
        errorPlacement: function (error, element) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                element = $("#select2-" + elem.attr("id") + "-container").parent();
                error.insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var ajaxurl = $("#step2Route").val();
            var seriealized = $(form).serialize();
            // parsestocktoform(form);
            //console.log(ajaxurl);
            //ajax to block the stock before
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: seriealized,
                cache: false,
                processData: false,
                success: function (data) {

                    var issubmitted = data.success;
                    var message = data.response;
                    console.log(message.patient_id)
                    if (message.patient_id==null) {
                        swal({title: "Sorry", text:  " "+message.message, type: "error", confirmButtonText: "OK" }).then((value) => {
                            location.reload(true);
                        });
                        // swal("Sorry", 'please fill patient details first', "error");
                    }
                    $('#patientId1').val(message.patient_id)
                    $('#patientId2').val(message.patient_id)
                    $('#patientId3').val(message.patient_id)
                    $('#patientId4').val(message.patient_id)
                    $('#patientId5').val(message.patient_id)
                    $('#patientId6').val(message.patient_id)
                    $('#patientId7').val(message.patient_id)
                    if (issubmitted == false) {
                        swal({title: "Sorry", text:  " "+message, type: "error"},
                           function(){ 
                               location.reload();
                           }
                        );
                    } else {
                        swal({title: "Success", text:  " "+message.message, type: "success", confirmButtonText: "OK" }).then((value) => {
                            $('#step2').fadeIn()
                            $('#step2').css({
                                display: "none"
                            })
                            $('#step3').css({
                                display: "inline-block"
                            })

                            $('#step2btn').removeClass("sf-active")
                            $('#step3btn').addClass("sf-active")
                        });
                    }

                },
                error:function(xhr, status, error){
                    swal("Oops", error, "error");

                }
            });

            //ajax method ends here

            // $('input[name^="pages_title"]')

        }
    });
    $("#step3Form").validate({
        focusInvalid: true,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var firstInvalidElement = $(validator.errorList[0].element);
                //$('html,body').scrollTop(firstInvalidElement.offset().top);
                $("html, body").animate({
                    scrollTop: firstInvalidElement.offset().top - 100
                }, 600);
                //firstInvalidElement.focus();
            }
        },
        rules: {

            'months[]': {
                required: true,
            },
            symptoms_affect_day_to_day: {
                required: true,
            },
            'symptoms_worse_location[]': {
                required: true,
            },
            'symptoms_worsened_by_trigger[]': {
                required: true,
            },
            'symptoms_worsened_by_trigger[]': {
                required: true,
            },
        },
        highlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
            } else {
                elem.addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
            } else {
                elem.removeClass(errorClass);
            }
        },
        errorPlacement: function (error, element) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                element = $("#select2-" + elem.attr("id") + "-container").parent();
                error.insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var ajaxurl = $("#step3Route").val();
            var seriealized = $(form).serialize();
            // parsestocktoform(form);
            //console.log(ajaxurl);
            //ajax to block the stock before
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: seriealized,
                cache: false,
                processData: false,
                success: function (data) {

                    var issubmitted = data.success;
                    var message = data.response;
                    console.log(message.patient_id)
                    if (message.patient_id==null) {
                        swal({title: "Sorry", text:  " "+message.message, type: "error", confirmButtonText: "OK" }).then((value) => {
                            location.reload(true);
                        });
                    }

                    $('#patientId1').val(message.patient_id)
                    $('#patientId2').val(message.patient_id)
                    $('#patientId3').val(message.patient_id)
                    $('#patientId4').val(message.patient_id)
                    $('#patientId5').val(message.patient_id)
                    $('#patientId6').val(message.patient_id)
                    $('#patientId7').val(message.patient_id)
                    if (issubmitted == false) {
                        swal("Sorry", message, "error");
                       // reloadPage();
                    } else {
                        swal({title: "Success", text:  " "+message.message, type: "success",icon: "success", confirmButtonText: "OK" }).then((value) => {
                          // location.href('/patients');
                            $('#step3').fadeIn()
                            $('#step3').css({
                                display: "none"
                            })
                            $('#step4').css({
                                display: "inline-block"
                            })

                            $('#step3btn').removeClass("sf-active")
                            $('#step4btn').addClass("sf-active")
                          
                        });
                    }
                },
                error:function(xhr, status, error){
                    
                    swal("Oops", error, "error");

                }
            });

            //ajax method ends here

            // $('input[name^="pages_title"]')

        }
    });
    $("#step4Form").validate({
        focusInvalid: true,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var firstInvalidElement = $(validator.errorList[0].element);
                //$('html,body').scrollTop(firstInvalidElement.offset().top);
                $("html, body").animate({
                    scrollTop: firstInvalidElement.offset().top - 100
                }, 600);
                //firstInvalidElement.focus();
            }
        },
        rules: {

            'months[]': {
                required: true,
            },
            symptoms_affect_day_to_day: {
                required: true,
            },
            'symptoms_worse_location[]': {
                required: true,
            },
            'symptoms_worsened_by_trigger[]': {
                required: true,
            },
            'symptoms_worsened_by_trigger[]': {
                required: true,
            },
        },
        highlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
            } else {
                elem.addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
            } else {
                elem.removeClass(errorClass);
            }
        },
        errorPlacement: function (error, element) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                element = $("#select2-" + elem.attr("id") + "-container").parent();
                error.insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var ajaxurl = $("#step4Route").val();
            var seriealized = $(form).serialize();
            // parsestocktoform(form);
            //console.log(ajaxurl);
            //ajax to block the stock before
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: seriealized,
                cache: false,
                processData: false,
                success: function (data) {

                    var issubmitted = data.success;
                    var message = data.response;
                    console.log(message.patient_id)
                    if (message.patient_id==null) {
                        swal({title: "Sorry", text:  " "+message.message, type: "error", confirmButtonText: "OK" }).then((value) => {
                            location.reload(true);
                        });
                    }

                    $('#patientId1').val(message.patient_id)
                    $('#patientId2').val(message.patient_id)
                    $('#patientId3').val(message.patient_id)
                    $('#patientId4').val(message.patient_id)
                    $('#patientId5').val(message.patient_id)
                    $('#patientId6').val(message.patient_id)
                    $('#patientId7').val(message.patient_id)
                    if (issubmitted == false) {
                        swal("Sorry", message, "error");
                       // reloadPage();
                    } else {
                        swal({title: "Success", text:  " "+message.message, type: "success",icon: "success", confirmButtonText: "OK" }).then((value) => {
                          // location.href('/patients');
                            $('#step4').fadeIn()
                            $('#step4').css({
                                display: "none"
                            })
                            $('#step5').css({
                                display: "inline-block"
                            })

                            $('#step4btn').removeClass("sf-active")
                            $('#step5btn').addClass("sf-active")
                          
                        });
                    }

                },
                error:function(xhr, status, error){
                    
                    swal("Oops", error, "error");

                }
            });

            //ajax method ends here

            // $('input[name^="pages_title"]')

        }
    });
    $("#step5Form").validate({
        focusInvalid: true,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var firstInvalidElement = $(validator.errorList[0].element);
                //$('html,body').scrollTop(firstInvalidElement.offset().top);
                $("html, body").animate({
                    scrollTop: firstInvalidElement.offset().top - 100
                }, 600);
                //firstInvalidElement.focus();
            }
        },
        highlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
            } else {
                elem.addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
            } else {
                elem.removeClass(errorClass);
            }
        },
        errorPlacement: function (error, element) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                element = $("#select2-" + elem.attr("id") + "-container").parent();
                error.insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var ajaxurl = $("#step5Route").val();
            var seriealized = $(form).serialize();
            // parsestocktoform(form);
            //console.log(ajaxurl);
            //ajax to block the stock before
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: seriealized,
                cache: false,
                processData: false,
                success: function (data) {

                    var issubmitted = data.success;
                    var message = data.response;
                    console.log(message.patient_id)
                    if (message.patient_id==null) {
                        swal({title: "Sorry", text:  " "+message.message, type: "error", confirmButtonText: "OK" }).then((value) => {
                            location.reload(true);
                        });
                    }
                    
                    $('#patientId1').val(message.patient_id)
                    $('#patientId2').val(message.patient_id)
                    $('#patientId3').val(message.patient_id)
                    $('#patientId4').val(message.patient_id)
                    $('#patientId5').val(message.patient_id)
                    $('#patientId6').val(message.patient_id)
                    $('#patientId7').val(message.patient_id)

                    if (issubmitted == false) {
                        swal("Sorry", message, "error");
                       // reloadPage();
                    } else {
                        swal({title: "Success", text:  " "+message.message, type: "success",icon: "success", confirmButtonText: "OK" }).then((value) => {
                          // location.href('/patients');
                            $('#step5').fadeIn()
                            $('#step5').css({
                                display: "none"
                            })
                            $('#step6').css({
                                display: "inline-block"
                            })

                            $('#step5btn').removeClass("sf-active")
                            $('#step6btn').addClass("sf-active")
                          
                        });
                    }
                },
                error:function(xhr, status, error){
                    
                    swal("Oops", error, "error");

                }
            });

            //ajax method ends here

            // $('input[name^="pages_title"]')

        }
    });
    $("#step6Form").validate({
        focusInvalid: true,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var firstInvalidElement = $(validator.errorList[0].element);
                //$('html,body').scrollTop(firstInvalidElement.offset().top);
                $("html, body").animate({
                    scrollTop: firstInvalidElement.offset().top - 100
                }, 600);
                //firstInvalidElement.focus();
            }
        },
        highlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
            } else {
                elem.addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
            } else {
                elem.removeClass(errorClass);
            }
        },
        errorPlacement: function (error, element) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                element = $("#select2-" + elem.attr("id") + "-container").parent();
                error.insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var ajaxurl = $("#step6Route").val();
            var seriealized = $(form).serialize();
            // parsestocktoform(form);
            //console.log(ajaxurl);
            //ajax to block the stock before
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: seriealized,
                cache: false,
                processData: false,
                success: function (data) {

                    var issubmitted = data.success;
                    var message = data.response;
                    console.log(message.patient_id)
                    if (message.patient_id==null) {
                        swal({title: "Sorry", text:  " "+message.message, type: "error", confirmButtonText: "OK" }).then((value) => {
                            location.reload(true);
                        });
                    }
                    
                    $('#patientId1').val(message.patient_id)
                    $('#patientId2').val(message.patient_id)
                    $('#patientId3').val(message.patient_id)
                    $('#patientId4').val(message.patient_id)
                    $('#patientId5').val(message.patient_id)
                    $('#patientId6').val(message.patient_id)
                    $('#patientId7').val(message.patient_id)
                    if (issubmitted == false) {
                        swal("Sorry", message, "error");
                       // reloadPage();
                    } else {
                        swal({title: "Success", text:  " "+message.message, type: "success",icon: "success", confirmButtonText: "OK" }).then((value) => {
                          // location.href('/patients');
                            $('#step6').fadeIn()
                            $('#step6').css({
                                display: "none"
                            })
                            $('#step7').css({
                                display: "block"
                            })

                            $('#step6btn').removeClass("sf-active")
                            $('#step7btn').addClass("sf-active")
                          
                        });
                    }
                },
                error:function(xhr, status, error){
                    
                    swal("Oops", error, "error");

                }
            });

            //ajax method ends here

            // $('input[name^="pages_title"]')

        }
    });
    $("#step7Form").validate({
        focusInvalid: true,
        invalidHandler: function (form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var firstInvalidElement = $(validator.errorList[0].element);
                //$('html,body').scrollTop(firstInvalidElement.offset().top);
                $("html, body").animate({
                    scrollTop: firstInvalidElement.offset().top - 100
                }, 600);
                //firstInvalidElement.focus();
            }
        },
        highlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().addClass(errorClass);
            } else {
                elem.addClass(errorClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                $("#select2-" + elem.attr("id") + "-container").parent().removeClass(errorClass);
            } else {
                elem.removeClass(errorClass);
            }
        },
        errorPlacement: function (error, element) {
            var elem = $(element);
            if (elem.hasClass("select2-hidden-accessible")) {
                element = $("#select2-" + elem.attr("id") + "-container").parent();
                error.insertAfter(element);
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var ajaxurl = $("#step7Route").val();
            var seriealized = $(form).serialize();
            // parsestocktoform(form);
            //console.log(ajaxurl);
            //ajax to block the stock before
            $.ajax({
                url: ajaxurl,
                type: "POST",
                data: seriealized,
                cache: false,
                processData: false,
                success: function (data) {

                    var issubmitted = data.success;
                    var message = data.response;
                    console.log(message.patient_id)
                    if (message.patient_id==null) {
                        swal({title: "Sorry", text:  " "+message.message, type: "error", confirmButtonText: "OK" }).then((value) => {
                            location.reload(true);
                        });
                    }
                    
                    $('#patientId1').val(message.patient_id)
                    $('#patientId2').val(message.patient_id)
                    $('#patientId3').val(message.patient_id)
                    $('#patientId4').val(message.patient_id)
                    $('#patientId5').val(message.patient_id)
                    $('#patientId6').val(message.patient_id)
                    $('#patientId7').val(message.patient_id)
                    if (issubmitted == false) {
                        swal("Sorry", message, "error");
                       // reloadPage();
                    } else {
                        swal({title: "Success", text:  " "+message.message, type: "success", confirmButtonText: "OK" }).then((value) => {
                           window.location.href ='/patients';
                        });
                        
                    }

                },
                error:function(xhr, status, error){
                    
                    swal("Oops", error, "error");

                }
            });

            //ajax method ends here

            // $('input[name^="pages_title"]')

        }
    });
    




    
//chart manipulation funcions starts from here
    var chartdataurl = $("#dougntdataurl").val();
    var dougnutajaxdata = null;
 //   console.log(chartdataurl);

 $('#chartfilterform').validate({
    // focusInvalid: true,
    // invalidHandler: function (form, validator) {
    //     var errors = validator.numberOfInvalids();
    //     if (errors) {
    //         var firstInvalidElement = $(validator.errorList[0].element);
    //         //$('html,body').scrollTop(firstInvalidElement.offset().top);
    //         $("html, body").animate({
    //             scrollTop: firstInvalidElement.offset().top - 100
    //         }, 600);
    //         //firstInvalidElement.focus();
    //     }
    // },
    submitHandler:function(form){
        var seriealized = $(form).serialize();
        var ajaxurl = $("#chart_filter_submit").data('chartdataurl');
        $.ajax({
            url:ajaxurl,
            type: "POST",
            data: seriealized,
            cache: false,
            processData: false,
            success:function(data){
                // $asthma = [],
                // $commoncold = [],
                var doughnutdataajax = data.response.doughnut;
                var barchartdataajax = data.response.barchartdata;
                var symptompbarchartdataajax = data.response.symptompbarchart;
                console.log(symptompbarchartdataajax)
                var doughntdata = {
                    labels: doughnutdataajax.labels,
                    datasets: [
                        {
                            data: doughnutdataajax.dataset,
                            backgroundColor: doughnutdataajax.backgroundColor,
                        }
                    ]
                };
                drawdoughnut(doughntdata);

                //barchart data
                var totalpatient = barchartdataajax;
              //  console.log(totalpatient);
                // var morethan4days = barchartdataajax[0];
                // var morethan4weeks = barchartdataajax[1];
                var months = [];
                var patientcount = [];
                // var datasets4days = [];
                // var datasets4weeks = [];


                for(var j = 0; j< totalpatient.length; j++){
                    months.push(totalpatient[j].month);
                    patientcount.push(totalpatient[j].totalreg);
                }
              //  console.log('this is patient count',patientcount);
                // if(morethan4days.length>morethan4weeks.length){

                //     for(var i=0; i<morethan4days.length; i++){
                //         months.push(morethan4days[i].month);
                //         datasets4days.push(morethan4days[i].totalreg);
                //     }
                //     for(var i=0; i<morethan4weeks.length; i++){
                //        // months.push(morethan4weeks[i].month);
                //         datasets4weeks.push(morethan4weeks[i].totalreg);
                //     }
    
                // }else{
                //     for(var i=0; i<morethan4days.length; i++){
                //         //months.push(morethan4days[i].month);
                //         datasets4days.push(morethan4days[i].totalreg);
                //     }
                //     for(var i=0; i<morethan4weeks.length; i++){
                //         months.push(morethan4weeks[i].month);
                //         datasets4weeks.push(morethan4weeks[i].totalreg);
                //     }
                // }

 // console.log(datasets4weeks);
                var areaChartData = {
                    labels: months,
                    datasets: [
                        {
                            label: 'Total Patients',
                            backgroundColor: 'rgba(60,141,188,0.9)',
                            borderColor: 'rgba(60,141,188,0.8)',
                            pointRadius: false,
                            pointColor: '#3b8bba',
                            pointStrokeColor: 'rgba(60,141,188,1)',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(60,141,188,1)',
                            data: patientcount
                        },
                        
                    ]
                };
                var symptompbardatsets = [];
                var symptompsmonh = [];
                var sympmax = symptompbarchartdataajax[0].data.length;
                var sympmaxindex = 0;
                for(var k=0; k<symptompbarchartdataajax.length;k++){

                    if(symptompbarchartdataajax[k].data>sympmax){

                        sympmax = symptompbarchartdataajax[k].data.length;
                        sympmaxindex = k;
                    }

                }

                for(var j = 0; j< symptompbarchartdataajax[sympmaxindex].data.length; j++){

                    symptompsmonh.push(symptompbarchartdataajax[sympmaxindex].data[j].month)

                }


                for(var k=0; k<symptompbarchartdataajax.length;k++){


                    var datapoints = [];
                    for(var l=0; l<symptompbarchartdataajax[k].data.length; l++){
                        // console.log('before push datapoints', symptompbarchartdataajax[k].data);
                        datapoints.push(symptompbarchartdataajax[k].data[l].totalreg);

                    }
                    //console.log('this are my datapoint', datapoints);
                    var dataset = {
                        label: symptompbarchartdataajax[k].lable,
                        backgroundColor: symptompbarchartdataajax[k].color,
                        borderColor: symptompbarchartdataajax[k].color,
                        pointRadius: false,
                        pointColor: symptompbarchartdataajax[k].color,
                        pointStrokeColor: 'rgba(60,141,188,1)',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(60,141,188,1)',
                        data: datapoints
                    }
                    
                    //console.log("mt datasets",symptompbarchartdataajax[k].data);
                    symptompbardatsets.push(dataset);

                }
              //  console.log(symptompbardatsets);
                var symptopmsareaChartData = {
                    labels: symptompsmonh,
                    datasets: symptompbardatsets
                };
                drawbrachart(areaChartData);
                drawbrachartsymptomps(symptopmsareaChartData);
               // console.log(doughntdata, barchartdata);
            }
        })

    }
 })

    $.ajax({
        url: chartdataurl,
        type: "GET",
        cache: false,
        processData: false,
        success: function(data){
            dougnutajaxdata = data.response.data;
            var doughntdata = {
                labels: dougnutajaxdata.labels,
                datasets: [
                    {
                        data: dougnutajaxdata.datasets[0].data,
                        backgroundColor: dougnutajaxdata.datasets[0].backgroundColor,
                    }
                ]
            };
            drawdoughnut(doughntdata);

            //for barchart

        },
        error: function (data) {
            console.log(data)
            // location.reload(true);
        }
    });

    
    //-------------
    //- DONUT CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.


    function drawdoughnut(donutData){
        var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
        
        var donutOptions = {
            maintainAspectRatio: false,
            responsive: true,
        }
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        var donutChart = new Chart(donutChartCanvas, {
            type: 'doughnut',
            data: donutData,
            options: donutOptions
        })
    }
   

    
    var barcharturl = $('#barcharturl').val();

    $.ajax({
        url: barcharturl,
        type: "GET",
        cache: false,
        processData: false,
        success:function(data){
            var requestdata = data.response;
           // console.log('this barchart data',requestdata)
            var totalpatient = requestdata;
           console.log('this barchart data',totalpatient)
            // var morethan4days = requestdata[0];
            // var morethan4weeks = requestdata[1];
            var months = [];
            var totalpatients = [];
            // var datasets4days = [];
            // var datasets4weeks = [];


            for(var i = 0; i<totalpatient.length; i++){
                months.push(totalpatient[i].month);
                totalpatients.push(totalpatient[i].totalreg);
               // console.log('patient count',totalpatient[i].totalreg);
            }


            // if(morethan4days.length>morethan4weeks.length){

            //     for(var i=0; i<morethan4days.length; i++){
            //         months.push(morethan4days[i].month);
            //         datasets4days.push(morethan4days[i].totalreg);
            //     }
            //     for(var i=0; i<morethan4weeks.length; i++){
            //        // months.push(morethan4weeks[i].month);
            //         datasets4weeks.push(morethan4weeks[i].totalreg);
            //     }

            // }else{
            //     for(var i=0; i<morethan4days.length; i++){
            //         //months.push(morethan4days[i].month);
            //         datasets4days.push(morethan4days[i].totalreg);
            //     }
            //     for(var i=0; i<morethan4weeks.length; i++){
            //         months.push(morethan4weeks[i].month);
            //         datasets4weeks.push(morethan4weeks[i].totalreg);
            //     }
            // }
          // console.log(totalpatients);
            var areaChartData = {
                labels: months,
                datasets: [
                    {
                        label: 'Total Patients',
                        backgroundColor: 'rgba(60,141,188,0.9)',
                        borderColor: 'rgba(60,141,188,0.8)',
                        pointRadius: false,
                        pointColor: '#3b8bba',
                        pointStrokeColor: 'rgba(60,141,188,1)',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(60,141,188,1)',
                        data: totalpatients
                    },
                    
                ]
            };

           
            drawbrachart(areaChartData);
           // drawbrachartsymptomps(symptopmsareaChartData);
        },
        error: function (data) {
            console.log(data)
            // location.reload(true);
        }

    });


    function drawbrachart(areaChartData){
        // var areaChartData = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',],
        //     datasets: [
        //         {
        //             label: 'More than 4 day per week',
        //             backgroundColor: 'rgba(60,141,188,0.9)',
        //             borderColor: 'rgba(60,141,188,0.8)',
        //             pointRadius: false,
        //             pointColor: '#3b8bba',
        //             pointStrokeColor: 'rgba(60,141,188,1)',
        //             pointHighlightFill: '#fff',
        //             pointHighlightStroke: 'rgba(60,141,188,1)',
        //             data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86,]
        //         },
        //         {
        //             label: 'More than 4 week at a stretch',
        //             backgroundColor: 'rgba(210, 214, 222, 1)',
        //             borderColor: 'rgba(210, 214, 222, 1)',
        //             pointRadius: false,
        //             pointColor: 'rgba(210, 214, 222, 1)',
        //             pointStrokeColor: '#c1c7d1',
        //             pointHighlightFill: '#fff',
        //             pointHighlightStroke: 'rgba(220,220,220,1)',
        //             data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56,]
        //         },
        //     ]
        // }
    
        //-------------
        //- BAR CHART -
        //-------------
        var barChartCanvas = $('#barChart').get(0).getContext('2d')
        var barChartData = jQuery.extend(true, {}, areaChartData)
       // var temp0 = areaChartData.datasets[0]
        // var temp1 = areaChartData.datasets[1]
       // barChartData.datasets[0] = temp0
        // barChartData.datasets[1] = temp0

        // console.log("barchart data", areaChartData.datasets.length);
        // for(var i=0; i<areaChartData.datasets.length; i++){
        //     barChartData.datasets.push(areaChartData.datasets[i]);
        // }
        //console.log("barchart data", barChartData.datasets);
        var barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
        }
    
        var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions
        })

    }

    var symptompbarcharturl = $('#symptompsbarcharturl').val();
    $.ajax({
        url:symptompbarcharturl,
        type: "GET",
        cache: false,
        processData: false,
        success:function(data){
            // $asthma = [],
            // $commoncold = [],
          
            var symptompbarchartdataajax = data.response;
            var months = [];

            var max = symptompbarchartdataajax[0].data.length;
            var maxindex = 0;
           // console.log(max);
           
           for(var k=0; k<symptompbarchartdataajax.length;k++){
               if(symptompbarchartdataajax[k].data.length>max){

                max = symptompbarchartdataajax[k].data.length;
                maxindex = k;
                // for(var l=0; l<symptompbarchartdataajax[k].data.length; l++){
                //          months.push(symptompbarchartdataajax[k].data[l].month);
                // }
               }
        //        else{
        // //         for(var l=0; l<symptompbarchartdataajax[0].data.length; l++){
        // //             months.push(symptompbarchartdataajax[0].data[l].month);
        // //    }
        //        }
           }

           for(var l=0; l<symptompbarchartdataajax[maxindex].data.length; l++){
            months.push(symptompbarchartdataajax[maxindex].data[l].month);
             }

         
            var symptompbardatsets = [];
            for(var k=0; k<symptompbarchartdataajax.length;k++){


                


                var datapoints = [];
                for(var l=0; l<symptompbarchartdataajax[k].data.length; l++){
                    // console.log('before push datapoints', symptompbarchartdataajax[k].data);
                    datapoints.push(symptompbarchartdataajax[k].data[l].totalreg);
                    // if(symptompbarchartdataajax[k].data.length>=max){
                    //     months.push(symptompbarchartdataajax[k].data[l].month);
                    // }

                }
                //console.log('this are my datapoint', datapoints);
                var dataset = {
                    label: symptompbarchartdataajax[k].lable,
                    backgroundColor: symptompbarchartdataajax[k].color,
                    borderColor: symptompbarchartdataajax[k].color,
                    pointRadius: false,
                    pointColor: symptompbarchartdataajax[k].color,
                    pointStrokeColor: 'rgba(60,141,188,1)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(60,141,188,1)',
                    data: datapoints
                }
                
                //console.log("mt datasets",symptompbarchartdataajax[k].data);
                symptompbardatsets.push(dataset);

            }
             console.log('my months',months);
            var symptopmsareaChartData = {
                labels: months,
                datasets: symptompbardatsets
            };
          //  drawbrachart(areaChartData);
            drawbrachartsymptomps(symptopmsareaChartData);
           // console.log(doughntdata, barchartdata);
        }
    })
    function drawbrachartsymptomps(areaChartData){
        // var areaChartData = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',],
        //     datasets: [
        //         {
        //             label: 'More than 4 day per week',
        //             backgroundColor: 'rgba(60,141,188,0.9)',
        //             borderColor: 'rgba(60,141,188,0.8)',
        //             pointRadius: false,
        //             pointColor: '#3b8bba',
        //             pointStrokeColor: 'rgba(60,141,188,1)',
        //             pointHighlightFill: '#fff',
        //             pointHighlightStroke: 'rgba(60,141,188,1)',
        //             data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86,]
        //         },
        //         {
        //             label: 'More than 4 week at a stretch',
        //             backgroundColor: 'rgba(210, 214, 222, 1)',
        //             borderColor: 'rgba(210, 214, 222, 1)',
        //             pointRadius: false,
        //             pointColor: 'rgba(210, 214, 222, 1)',
        //             pointStrokeColor: '#c1c7d1',
        //             pointHighlightFill: '#fff',
        //             pointHighlightStroke: 'rgba(220,220,220,1)',
        //             data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56,]
        //         },
        //     ]
        // }
    
        //-------------
        //- BAR CHART -
        //-------------
        var barChartCanvas = $('#barChartsymptopms').get(0).getContext('2d')
        var barChartData = jQuery.extend(true, {}, areaChartData)
       // var temp0 = areaChartData.datasets[0]
        // var temp1 = areaChartData.datasets[1]
       // barChartData.datasets[0] = temp0
        // barChartData.datasets[1] = temp0

        // console.log("barchart data", areaChartData.datasets.length);
        // for(var i=0; i<areaChartData.datasets.length; i++){
        //     barChartData.datasets.push(areaChartData.datasets[i]);
        // }
        //console.log("barchart data", barChartData.datasets);
        var barChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            datasetFill: false
        }
    
        var barChart = new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: barChartOptions
        })

    }

    
    $("#example1").DataTable();


     /*
     * BAR CHART
     * ---------
     */

    // var bar_data = {
    //     data : [[1,10], [2,8], [3,4], [4,13], [5,17], [6,9]],
    //     bars: { show: true }
    //   }
    //   $.plot('#symptomps-test', [bar_data], {
    //     grid  : {
    //       borderWidth: 1,
    //       borderColor: '#f3f3f3',
    //       tickColor  : '#f3f3f3'
    //     },
    //     series: {
    //        bars: {
    //         show: true, barWidth: 0.5, align: 'center',
    //       },
    //     },
    //     colors: ['#ACBD1C'],
    //     xaxis : {
    //       ticks: [[1,'January'], [2,'February'], [3,'March'], [4,'April'], [5,'May'], [6,'June']]
    //     }
    //   })
    //   /* END BAR CHART */

});

$(document).ready(function () {
    var aeroRequiredRow = $("#is_aero_required").find("tr");
    
    aeroRequiredRow.each(function () {
        var tds = $(this).find('td');
        var months = tds.eq(3).find('input');
        var w1 = tds.eq(4).find('input');
        var f1 = tds.eq(5).find('input');
        var result1 = tds.eq(6).find('select');
        var w2 = tds.eq(7).find('input');
        var f2 = tds.eq(8).find('input');
        var result2 = tds.eq(9).find('select');
        var chekbox = tds.eq(2).find('input');


        chekbox.click(function () {
            var ischekced = $(this).is(':checked');
            console.log(ischekced);
            months.prop('disabled', !ischekced);
            w1.prop('disabled', !ischekced);
            f1.prop('disabled', !ischekced);
            result1.prop('disabled', !ischekced);
            w2.prop('disabled', !ischekced);
            f2.prop('disabled', !ischekced);
            result2.prop('disabled', !ischekced);
        });
    });

    var foodRequiredRow = $("#is_food_required").find('tr');

    foodRequiredRow.each(function () {

        var tds = $(this).find('td');
        var w1 = tds.eq(3).find('input');
        var f1 = tds.eq(4).find('input');
        var result1 = tds.eq(5).find('select');
        var w2 = tds.eq(6).find('input');
        var f2 = tds.eq(7).find('input');
        var result2 = tds.eq(8).find('select');
        var chekbox = tds.eq(2).find('input');


        chekbox.click(function () {
            var ischekced = $(this).is(':checked');
            console.log(ischekced);
            w1.prop('disabled', !ischekced);
            f1.prop('disabled', !ischekced);
            result1.prop('disabled', !ischekced);
            w2.prop('disabled', !ischekced);
            f2.prop('disabled', !ischekced);
            result2.prop('disabled', !ischekced);
        });

    });


    var aero_immune = $("#select_aero_immune").find('tr');

    aero_immune.each(function () {

        var tds = $(this).find('td');
        var val1 = tds.eq(0).find('input');
        var val2 = tds.eq(1).find('input');
        var chekbox = tds.eq(2).find('input');


        chekbox.click(function () {
            var ischekced = $(this).is(':checked');
            console.log(ischekced);
                if (ischekced) {
                    var array = $("input:checkbox[class=immun_aero_select]:checked")
                    console.log(array.length)
                    if (array.length >10) {
                        swal("Sorry", 'Cannot select more than 10 fields', "warning");
                        $(this).prop('checked', false);
                    }
                }
            
            
        });

    });

    var food_immune = $("#select_food_immune").find('tr');

    food_immune.each(function () {

        var tds = $(this).find('td');
        var val1 = tds.eq(0).find('input');
        var val2 = tds.eq(1).find('input');
        var chekbox = tds.eq(2).find('input');


        chekbox.click(function () {
            var ischekced = $(this).is(':checked');
            console.log(ischekced);
                if (ischekced) {
                    var array = $("input:checkbox[class=immun_food_select]:checked")
                    console.log(array.length)
                    if (array.length >10) {
                        swal("Sorry", 'Cannot select more than 10 fields', "warning");
                        $(this).prop('checked', false);
                    }
                }
            
            
        });

    });
})