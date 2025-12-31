package org.jahia.modules.ckeditor;

import org.jahia.ajax.gwt.helper.ModuleGWTResources;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

import java.util.List;

@Component(service = ModuleGWTResources.class, immediate = true)
public class CkeditorGWTResources extends ModuleGWTResources {

    @Activate()
    private void activate() {
         setJavascriptResources(List.of("/modules/jquery/javascript/jquery-3.7.1.min.js"));
    }
}