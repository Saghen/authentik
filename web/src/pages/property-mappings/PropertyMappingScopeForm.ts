import { ScopeMapping, PropertymappingsApi } from "authentik-api";
import { gettext } from "django";
import { customElement, property } from "lit-element";
import { html, TemplateResult } from "lit-html";
import { DEFAULT_CONFIG } from "../../api/Config";
import { Form } from "../../elements/forms/Form";
import { ifDefined } from "lit-html/directives/if-defined";
import "../../elements/forms/HorizontalFormElement";

@customElement("ak-property-mapping-scope-form")
export class PropertyMappingScopeForm extends Form<ScopeMapping> {

    set mappingUUID(value: string) {
        new PropertymappingsApi(DEFAULT_CONFIG).propertymappingsScopeRead({
            pmUuid: value,
        }).then(mapping => {
            this.mapping = mapping;
        });
    }

    @property({attribute: false})
    mapping?: ScopeMapping;

    getSuccessMessage(): string {
        if (this.mapping) {
            return gettext("Successfully updated mapping.");
        } else {
            return gettext("Successfully created mapping.");
        }
    }

    send = (data: ScopeMapping): Promise<ScopeMapping> => {
        if (this.mapping) {
            return new PropertymappingsApi(DEFAULT_CONFIG).propertymappingsScopeUpdate({
                pmUuid: this.mapping.pk || "",
                data: data
            });
        } else {
            return new PropertymappingsApi(DEFAULT_CONFIG).propertymappingsScopeCreate({
                data: data
            });
        }
    };

    renderForm(): TemplateResult {
        return html`<form class="pf-c-form pf-m-horizontal">
            <ak-form-element-horizontal
                label=${gettext("Name")}
                ?required=${true}
                name="name">
                <input type="text" value="${ifDefined(this.mapping?.name)}" class="pf-c-form-control" required>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                label=${gettext("Scope name")}
                ?required=${true}
                name="scopeName">
                <input type="text" value="${ifDefined(this.mapping?.scopeName)}" class="pf-c-form-control" required>
                <p class="pf-c-form__helper-text">${gettext("Scope which the client can specify to access these properties.")}</p>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                label=${gettext("Description")}
                ?required=${true}
                name="description">
                <input type="text" value="${ifDefined(this.mapping?.description)}" class="pf-c-form-control" required>
                <p class="pf-c-form__helper-text">${gettext("Description shown to the user when consenting. If left empty, the user won't be informed.")}</p>
            </ak-form-element-horizontal>
            <ak-form-element-horizontal
                label=${gettext("Expression")}
                name="expression">
                <ak-codemirror mode="python" value="${this.mapping?.expression}">
                </ak-codemirror>
                <p class="pf-c-form__helper-text">
                    Expression using Python. See <a href="https://goauthentik.io/docs/property-mappings/expression/">here</a> for a list of all variables.
                </p>
            </ak-form-element-horizontal>
        </form>`;
    }

}
